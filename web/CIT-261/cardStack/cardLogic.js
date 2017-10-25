var angle;
var hasFlipped;
var elm;
var st;
var tr;
var kingImg;
var backImg;
var flip;

function whenLoad(){
    angle = 0;
    flip = false;
    backImg = "Deck%20of%20cards/back2.png";
    kingImg = "Deck%20of%20cards/king.png";
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


    //var degree = Math.round(Math.asin(angValue[2]) * (180/Math.PI));

    if (!hasFlipped){
        var elmTransformation  = "rotateY(" + angle + "deg)";
        elm.style.transform = elmTransformation;

        angle += 1
        if(angle%90 == 0) {
            hasFlipped = true;
        }
    }
    else{
        if(flip)
            elm.src = kingImg;
        else
            elm.src = backImg;

        hasFlipped = false;
        flip = !flip;
    }
}


setInterval(flip, 10);