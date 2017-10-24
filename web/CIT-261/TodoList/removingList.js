var parent;

/*//////////////////////////////////////////////////////////////////////
deletes locally stored string
/////////////////////////////////////////////////////////////////////*/
function deleteStorage(){
  localStorage.removeItem("listArr");
}

/*//////////////////////////////////////////////////////////////////////
sets a passed array into local storage.
/////////////////////////////////////////////////////////////////////*/
function setStoredArray(arr){
  if(arr.constructor === Array){
    localStorage.listArr = JSON.stringify(arr);
  }
  else {
    alert("parameter passed is not an array")
  }
}

/*//////////////////////////////////////////////////////////////////////
returns a locally stored string .
/////////////////////////////////////////////////////////////////////*/
function getStoredString(){
    if(localStorage.getItem("listArr"))
        return localStorage.listArr;
    else
        return null;
}

/*//////////////////////////////////////////////////////////////////////
will add a new string to the locally stored "array"
/////////////////////////////////////////////////////////////////////*/
function setNewItem(string){
  var storedString = getStoredString()
  var localArr;
  if(storedString !== null){
    localArr = JSON.parse(storedString);
    localArr.push(string);
    setStoredArray(localArr);
  }
  else{
    localArr = [];
    localArr.push(string);
    setStoredArray(localArr);
  }
}

/*//////////////////////////////////////////////////////////////////////
will remove an existing item from the locally stored "array"
/////////////////////////////////////////////////////////////////////*/
function removeItem(string){
  //removes teh span element from the string
  var endofItem = string.indexOf("<");
  var newString = string.slice(0, endofItem);

  var savedArr;
  var newArr = [];
  var storedString = getStoredString();

  if(storedString !== null){
    savedArr = JSON.parse(storedString);
    for(i = 0; i < savedArr.length; i++){
      if(newString !== savedArr[i]){
        newArr.push(savedArr[i]);
      }
    }
  }
  else{
    alert("string does not exist")
  }

/* creates a new local storage, or deletes the past storage if there's nothing
new to save */
  if(newArr.length >= 1){
    setStoredArray(newArr);
  }
  else {
    deleteStorage();
  }

}

/*//////////////////////////////////////////////////////////////////////
appends a span element to a parent li element which will
remove the element value from the locally stored array and makes
the parent element style none.
/////////////////////////////////////////////////////////////////////*/
function createButton(newLI){
  var btn = document.createElement("SPAN");
  var btnText = document.createTextNode("\u2714");
  btn.className = "done";
  btn.appendChild(btnText);

  btn.addEventListener('click', function(){
    var btnParent = this.parentElement;
    removeItem(btnParent.innerHTML);
    btnParent.style.display = "none";
  });
  newLI.appendChild(btn);
}


/*//////////////////////////////////////////////////////////////////////
if there's a locally stored "array" it will fill the list with the
array values.
/////////////////////////////////////////////////////////////////////*/
function createList(jsonArr){
  if(jsonArr.length > 0)
  {
    for(i = 0; i < jsonArr.length; i++){
      var newLI = document.createElement("li");
      var newItem = document.createTextNode(jsonArr[i]);
      newLI.appendChild(newItem);
      parent.appendChild(newLI);
      createButton(newLI);
    }
  }
}

/*//////////////////////////////////////////////////////////////////////
will set new items; by creating new li elements and filling them with
the form value, and saving the vale into a locally stored array
/////////////////////////////////////////////////////////////////////*/
function setItem(){
  var newLI = document.createElement("li");
  var listInput = document.getElementById("inputLine").value;
  var newItem = document.createTextNode(listInput);
  if(listInput === ''){
    alert("false input")
  }
  else {
    newLI.appendChild(newItem);
    parent.appendChild(newLI);
    createButton(newLI);

    //used for local storafe
    setNewItem(listInput);
  }
}

/*//////////////////////////////////////////////////////////////////////
loads a list of items you attempt to accomplish on the dayle
 //////////////////////////////////////////////////////////////////////*/
function loadDaily() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200){
            var xmlArr = JSON.parse(this.responseText);
            createList(xmlArr);

            var jsonString = getStoredString();
            if(jsonString !== null){
                alert("past string exist");
                var savedArr = JSON.parse(jsonString);
                var newArr = savedArr.concat(xmlArr);
                setStoredArray(newArr);
            }
            else{
                alert("past string does not exist");
                setStoredArray(xmlArr);
            }

        }
    };

    request.open("GET","savedList.txt",true);
    request.send();
}

/*//////////////////////////////////////////////////////////////////////
gives the parent var a value, and looks for locally stored arrays
/////////////////////////////////////////////////////////////////////*/
function setUp(){
  parent = document.getElementById("myList");

  var storedString = getStoredString();
  if(storedString !== null){
    var localArr = JSON.parse(storedString);
    createList(localArr);
  }
}
