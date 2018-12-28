$(document).ready(() => {
    $('#makeOrder').click(() => {
        $.post("/makeOrder", {
            "hs" : getCheckedIndex("hs"),
            "rs" : getCheckedIndex("rs"),
            "cs" : getCheckedIndex("cs"),
        }).done((data) => {
            let response = jQuery.parseJSON(data);
            /*$('#hs').text(JSON.stringify(response["hs"]));
            $('#rs').text(JSON.stringify(response["rs"]));
            $('#cs').text(JSON.stringify(response["cs"]));*/
            let time = JSON.stringify(response["time"]);
            $('#time').text(time);
            $('#data').attr("hidden", false);
            $('#prices').attr("hidden", true);
            renderTimeTable(response);
        });
    });
});

function getCheckedIndex(name){
    let index = -1;
    $('input[name=' + name + ']').each((i)=> {
        if ($('input[name=' + name + ']')[i].checked) {
            index = i;
        }
    });
    return index !== -1 ? index : "default";
}

function renderTimeTable(response){

    for(let hour = 8; hour < 17; hour++){
        for(let minutes = 0; minutes < 60; minutes+= 10){
            let time = hour + ":" + ("0" + minutes).slice(-2);
            $('#timeT').append("<tr id=" + time + "><td>" + time + "</td></tr>");
        }
    }

    $('#timeT').attr("hidden", false);

    /*time.forEach((value, index, array) => {

        let curVal = value.split(":");
        let hour = curVal[0];
        let minutes = curVal[1];
        minutes = ("0" + minutes).slice(-2);
        let time = hour + ":" + minutes;
        $("#" + time).attr("background-color", "red");
    });*/

    console.log(response);
    console.log(response["time"]);
    console.log(response["time"][0]);
    console.log(response["time"][1]);


    response["time"].forEach((value, index, array) => {

        let curVal = value.split(":");
        let hour = curVal[0];
        let minutes = curVal[1];
        minutes = ("0" + minutes).slice(-2);
        let time = hour + ":" + minutes;
        console.log(time);
        $("#" + time).attr("background-color", "red");
    });
}

