var angle;
var hasFlipped;
var elm;
var st;
var tr;

function whenLoad(){
    angle = 0;
    hasFlipped = false;
    elm = document.getElementById("back");
    st = window.getComputedStyle(elm,null);
    tr = st.getPropertyValue("transform");

}

function flip() {
//angValue first splits tr between ( and the rest of the string
    // and storing the second element "the rest of the string"
    var angValue = tr.split('(')[1],
        //then removes )
        angValue = angValue.split(')')[0],
        //splits the remaining array with ,
        angValue = angValue.split(',');


    var degree = Math.round(Math.asin(angValue[2]) * (180/Math.PI));

    if (angle <= 90 && !hasFlipped){
        elm.style.transform = "rotateY(\angle\)"
    }else if()
}


setInterval(flip, 10);