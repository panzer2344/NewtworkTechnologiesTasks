var swypeInputClassName = "swypeInput";
var swypeDataListClassName = "swypeDataList"
var swypeInputTextBoxClassName = "swypeInputTextBox";
var swypeDataListOptionClassName = "swypeDLOption";
var swypeDataListOptionIdNameBegin = "DLO";
var swypeInputClass = document.getElementsByClassName(swypeInputClassName);
var swypeDataListLen = 10;

function findFirstWithSameBeginning(diseredBeginning){
	var indexInDict = 0;
	
	while(indexInDict < dictionary.length){
		if( dictionary[indexInDict].indexOf(diseredBeginning) == 0 ){
			return indexInDict;
		}
		indexInDict++;
	}
	
	return -1;	
}

function genDataList(diseredBeginning){
	var indexInDict = -1;
	var indexInDL = 0;
	var foundedStrings = [];
	
	indexInDict = findFirstWithSameBeginning(diseredBeginning);
	console.log(indexInDict);
	
	if( indexInDict == -1 ){
		return foundedStrings;
	}
	
	while(indexInDL < swypeDataListLen){
		if( dictionary[indexInDict + indexInDL].indexOf(diseredBeginning) == 0 ){
			foundedStrings.push(dictionary[indexInDict + indexInDL]);
			indexInDL++;
		}else{
			break;
		}
	}
	
	return foundedStrings;
}

function swypeInputHandler(){
	var currentSwypeInputTBValueArray = this.value.split(' ');
	var foundedBeginOfString = currentSwypeInputTBValueArray.pop();
	var currentSwypeInputDiv = this.parentNode;
	var currentSwypeInputDivID = this.id;
	var currentSwypeDataList = currentSwypeInputDiv.getElementsByClassName(swypeDataListClassName)[0];
	
	console.log(currentSwypeInputTBValueArray)
	console.log(foundedBeginOfString);
	
	var hintsList = genDataList(foundedBeginOfString);
	console.log(hintsList);
	
	while(currentSwypeDataList.firstChild){
		currentSwypeDataList.removeChild(currentSwypeDataList.firstChild);
	}
	
	for(var i = 0; i < hintsList.length; i++){
		var option = document.createElement('option');
		option.class = swypeDataListOptionClassName;
		option.id = currentSwypeInputDivID + '_' + swypeDataListOptionIdNameBegin + i;
		
		for(word of currentSwypeInputTBValueArray){
			option.innerHTML += word + " ";
		}
		option.innerHTML += hintsList[i];
		console.log(option);
		
		currentSwypeDataList.appendChild(option);
	}
}

window.onload = function(){
	console.log(swypeInputClass);
	for (swypeInputElem of swypeInputClass){
		console.log(swypeInputElem.getElementsByClassName(swypeInputTextBoxClassName));
		swypeInputElem.getElementsByClassName(swypeInputTextBoxClassName)[0].oninput = swypeInputHandler;
		swypeInputElem.getElementsByClassName(swypeInputTextBoxClassName)[0].onclick = function() {
			this.select();
		}
	}
}