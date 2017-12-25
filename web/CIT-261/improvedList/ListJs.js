"use strict";
var listOnScreen;
var MAIN_LIST = "MAIN_LIST";
var parent;
var returnBTN;

/*/////////////////////////////////////////////////////
// goBack. reverts the list to the mainList
/////////////////////////////////////////////////////*/
function goBack() {
    if(listOnScreen !== MAIN_LIST) {
        listOnScreen = MAIN_LIST;
        clearList();
        var storedString = loadLocalStorage(listOnScreen);
        if (storedString !== null) {
            var arr = JSON.parse(storedString);
            loadList(arr);
        }

        returnBTN.style.visibility = "hidden";
    }
}

/*/////////////////////////////////////////////////////
// loadLocalStorage will return a string from local
// storage
/////////////////////////////////////////////////////*/
function loadLocalStorage(keyName) {
    if(localStorage.getItem(keyName))
        return localStorage.getItem(keyName);
    else
        return null;
}

/*/////////////////////////////////////////////////////
// deleteLocalStorage will remove a string form local
// storage
/////////////////////////////////////////////////////*/
function deleteLocalStorage(stringToRemove) {
 localStorage.removeItem(stringToRemove);
}

/*/////////////////////////////////////////////////////
// saveLocalStorage will save a string to local storage
/////////////////////////////////////////////////////*/
function saveLocalStorage(stringToSave) {
    localStorage.setItem(listOnScreen,stringToSave);
}

/*/////////////////////////////////////////////////////
// addItemToArr adds an element to an array that is/will
// be locally stored
/////////////////////////////////////////////////////*/
function addItemToArr(item) {
    var localStorageString = loadLocalStorage(listOnScreen);
    var stringafiedArr;

    if(localStorageString !== null){
        var localStorageArr = JSON.parse(localStorageString);
        localStorageArr.push(item);
        stringafiedArr = JSON.stringify(localStorageArr);
        saveLocalStorage(stringafiedArr);
    }
    else {
        var newArr = [];
        newArr.push(item);
        stringafiedArr = JSON.stringify(newArr);
        saveLocalStorage(stringafiedArr);
    }
}
/*/////////////////////////////////////////////////////
// removeItemFormArr will remove an element form an
// array that is/will be locally stored/
/////////////////////////////////////////////////////*/
function removeItemFromArr(elmToRemove) {
    var savedArr = JSON.parse(loadLocalStorage(listOnScreen));
    var newARR = [];

    savedArr.forEach(function (t) {
        if(t.nameOfItem !== elmToRemove){
            newARR.push(t);
        }
    });

    var newArrString = JSON.stringify(newARR);
    saveLocalStorage(newArrString);

}

/*/////////////////////////////////////////////////////
// BUTTON is a button constructor
/////////////////////////////////////////////////////*/
function BUTTON(canItDeleteArr) {
    var btn = document.createElement("SPAN");
    btn.classList.add("closeBtn");
    var txt = document.createTextNode("\u2714");
    btn.appendChild(txt);
    if(canItDeleteArr){
        btn.addEventListener('click', function (e) {
            var btnParent = this.parentElement;
            var liString = btnParent.childNodes[0].nodeValue;
            removeItemFromList(btnParent);
            removeItemFromArr(liString);
            deleteLocalStorage(liString);
            e.stopPropagation();
        })
    }
    else{
        btn.addEventListener('click', function () {
            var btnParent = this.parentElement;
            var liString = btnParent.childNodes[0].nodeValue;
            removeItemFromList(btnParent);
            removeItemFromArr(liString);
        })
    }


    return btn
}

/*/////////////////////////////////////////////////////
// ITEM is the list item constructor
/////////////////////////////////////////////////////*/
function ITEM(nameOfItem, isMainList, hasBeenClicked) {
    this.nameOfItem = nameOfItem;
    this.isMainList = isMainList;
    this.hasBeenClicked = hasBeenClicked;
}

/*/////////////////////////////////////////////////////
// createItem will create a LI element to add to a
// UL element
/////////////////////////////////////////////////////*/
function createListItem(listItem) {

    var listElm = document.createElement("LI");
    listElm.setAttribute("id","listItem");
    var listItemText = document.createTextNode(listItem.nameOfItem);
    listElm.appendChild(listItemText);

    /*If listElm is a main page element when clicked it will clear
    the current list and it will call a new list*/
    if(listItem.isMainList === true){
        listElm.addEventListener("click", function ()
        {
            /*//////////////////////////////////////////////////////////////
            //this section will probably cause trouble
            //////////////////////////////////////////////////////////////*/
            var thisELm = this;
            clearList();
            listOnScreen = thisELm.childNodes[0].nodeValue;
            returnBTN.style.visibility = "visible";
            var storedString = loadLocalStorage(listOnScreen);
            if(storedString !== null){
                var subArr = JSON.parse(storedString);
                loadList(subArr);
            }
        })
    }

    listElm.appendChild(BUTTON(listItem.isMainList));
    return listElm;
}
/*/////////////////////////////////////////////////////
// addItem gets the input form the html input tag
// and adds it to the screen and its assigned arr
/////////////////////////////////////////////////////*/
function addItem() {
    var mainItem;
    switch(listOnScreen){
        case MAIN_LIST:
            mainItem = true;
            break;
        default:
            mainItem = false;
    }

    var input = document.getElementById("input").value;
    if (input === ''){
        alert("false input");
    }
    else {
        var newArrItem = new ITEM(input, mainItem, false);
        var newLIElement = createListItem(newArrItem);
        parent.appendChild(newLIElement);
        addItemToArr(newArrItem);
    }
    document.getElementById("input").value = "";
}

/*/////////////////////////////////////////////////////
// removeItem removes item from the list
/////////////////////////////////////////////////////*/
function removeItemFromList(item) {
    parent.removeChild(item);
}

/*/////////////////////////////////////////////////////
//  clearList clears the screen
/////////////////////////////////////////////////////*/
function  clearList(){
    while (parent.hasChildNodes()){
        parent.removeChild(parent.firstChild);
    }
}

/*/////////////////////////////////////////////////////
//  loadList loads a list onto the screen
/////////////////////////////////////////////////////*/
function  loadList(arr) {
    arr.forEach(function (t) {
        var liELm = createListItem(t);
        parent.appendChild(liELm);
    })
}


/*/////////////////////////////////////////////////////
// setUp loads the screen and initiates myList
////////////////////////////////////////////////////*/
function setUp(){

    listOnScreen = MAIN_LIST;
    parent = document.getElementById("myList");
    returnBTN = document.getElementById("return");
    returnBTN.style.visibility = "hidden";

    var storedString = loadLocalStorage(listOnScreen);
    if(storedString !== null){
        var arr = JSON.parse(storedString);
        loadList(arr);
    }
}