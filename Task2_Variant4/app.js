const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const orderProcessing = require("./libs/OrderProcessing");
const bodyParser = require('body-parser');
const services = require("./data/services.json");
const Datastore = require('nedb');


const db = new Datastore({filename : 'records'});
db.loadDatabase();

//few examples
db.find({startTime : "14:00"}, (err, docs) => {
  if(!err) {
    if (docs == null || docs.length === 0) {
      db.insert({
        type: "order",
        startTime: "14:00",
        worktype: "0"
      });
    }
  }
});
db.find({startTime : "15:00"}, (err, docs) => {
  if(!err) {
    if (docs == null || docs.length === 0) {
      db.insert({
        type: "order",
        startTime: "15:00",
        worktype: "3"
      });
    }
  }
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());



//index page
app.get('/', (req, resp) => {
  resp.render('index');
});

//making order page
app.post('/makeOrder', (req, resp) => {
  let callback = function(req, resp, time) {
    let responseData = JSON.stringify({
      "time" : time
    });

    //console.log(responseData);
    resp.write(responseData);
    resp.end();
  };

  orderProcessing.process(
      db,
      callback,
      req,
      resp
  );

});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
