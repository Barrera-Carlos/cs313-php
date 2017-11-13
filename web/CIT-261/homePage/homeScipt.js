function firstPage() {

    var title = document.getElementById("on");
    title.style.backgroundColor = "#ff3333";

    var elm = document.getElementsByClassName("navBar");
    for(i = 0; i < elm.length; i++){
        elm[i].style.display = "block";
        if(elm[i] !== title)
            elm[i].style.color = "black";
    }

    var ul = document.getElementById("myUL");
    ul.style.overflow ="auto";
    ul.style.height = "100%";
    ul.style.position = "fixed";
    ul.style.width = "25%";
    ul.style.backgroundColor = "white";

    var title = document.getElementById("on");
    title.style.backgroundColor = "#ff3333";

    document.getElementsByClassName("Me")[1].src = "fFace.jpg";
    var aboutMe = document.getElementsByClassName("aboutMe")[0];
    aboutMe.style.backgroundColor = "#ff3333";
    aboutMe.style.border = "15px solid lightblue";
    aboutMe.style.color = "white";
    document.getElementsByTagName("BODY")[0].style.backgroundImage = "url(simple.jpg)";
}