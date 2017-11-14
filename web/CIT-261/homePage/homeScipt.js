var bodyImgElm;
var portrait;
var aboutMe;
var spaceCount;
var hasBodyImgChange = false;
var hasPortraitImgChange = false;

function keyDown() {
    spaceCount += 1;
    switch (spaceCount){
        case 1:
            var title = document.getElementById("on");
            title.style.backgroundColor = "#ff3333";

            var navBarelm = document.getElementsByClassName("navBar");
            for(var i = 0; i < navBarelm.length; i++){
                navBarelm[i].style.display = "block";
                if(navBarelm[i] !== title)
                    navBarelm[i].style.color = "black";
            }

            var ul = document.getElementById("myUL");
            ul.style.overflow ="auto";
            ul.style.height = "100%";
            ul.style.position = "fixed";
            ul.style.width = "25%";
            ul.style.backgroundColor = "white";

            break;
        case 2:
            if(!hasPortraitImgChange)
                changePortraitImg();
            break;
        case 3:
            if(!hasBodyImgChange)
                changeBodyImg();
            break;

    }

}

function changeBodyImg() {
    hasBodyImgChange = true;
    bodyImgElm.style.backgroundImage = "url(simple.jpg)";
    aboutMe.style.backgroundColor = "#ff3333";
    aboutMe.style.border = "15px solid lightblue";
    aboutMe.style.color = "white";

}

function changePortraitImg() {
    hasPortraitImgChange = true;
    portrait.src = "fFace.jpg";
}

function loadElm() {
    spaceCount = 0;
    bodyImgElm = document.getElementsByTagName("BODY")[0];
    aboutMe = document.getElementsByClassName("aboutMe")[0];
    aboutMe.addEventListener('touchend',changeBodyImg, false);
    portrait = document.getElementsByClassName("Me")[1];
    portrait.addEventListener('touchend',changePortraitImg, false);

    document.addEventListener("keydown", keyDown, false);
}
