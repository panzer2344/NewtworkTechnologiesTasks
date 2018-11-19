var swypeInputClassName = "swypeInput";
var swypeInputClass = document.getElementsByClassName(swypeInputClassName);

function swypeInputHandler(){
	alert("you tap swype input textbox");
}

window.onload = function(){
	console.log(swypeInputClass);
	for (swypeInputElem of swypeInputClass){
		swypeInputElem.oninput = swypeInputHandler;
	}
}