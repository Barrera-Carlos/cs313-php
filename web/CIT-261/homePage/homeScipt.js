function firstPage() {

    var elm = document.getElementsByClassName("navBar");
    elm[0].style.display = 'block';
    elm[1].parentNode.removeChild(elm[1]);

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