var deck;
var allFlipped = 0;

function clearCard() {
    if(allFlipped >= 13){
        deck.forEach(function (t) {
            t.elm.style.opacity = "0";
        });
    }
}


function flipCard() {
    var myElement = this;
    deck.forEach(function (t) {
        if(myElement === t.elm){
            var timer = setInterval(function () {
                t.flip(timer);
            }, 10);
        }
    });


}

function Card(faceImg, elm, zIndexNumber) {
    this.backImg = "Deck%20of%20cards/back2.png";
    this.faceImg = faceImg;
    this.angle = 0;
    this.elm = elm;
    this.zIndexNumber = zIndexNumber;
    this.moving = false;
    this.hasFliped = 0;
    this.flipingBack = false;
    this.changeCardImg = function () {
        this.elm.src = this.faceImg;
        this.flipingBack = true;
        this.zIndexNumber *= -1;
        this.elm.style.zIndex = String(this.zIndexNumber);
    };
    this.flip = function (timer) {
        if(!this.moving){
            this.elm.style.animationName = "stack";
            this.elm.style.animationDuration = "5s";
            this.elm.style.animationFillMode = "forwards";
            this.moving = true;
        }
        if (!this.hasFliped) {
            this.elm.style.transform = "rotateY(" + this.angle + "deg)";
            if (!this.flipingBack) {
                this.angle += 1;
                if (this.angle >= 90) {
                    this.changeCardImg();
                }
            }
            else{
                this.angle -= 1;
                if(this.angle <= 0)
                    this.hasFliped = 1;
            }
        }
        else{
            allFlipped += 1;
            clearInterval(timer);
        }

    };
}

function createDeck(deck, faceImg, parent) {
    var zindexNumber = -13;
    faceImg.forEach(function (t) {
        //create new card and element
        var newElm = document.createElement("IMG");
        var newCard = new Card(t, newElm,zindexNumber);
        //push new card into the deck array
        deck.push(newCard);

        //set up new element
        newElm.src = newCard.backImg;
        newElm.style.opacity = "1";
        newElm.style.zIndex = String(zindexNumber);
        newElm.style.position = "absolute";
        newElm.style.transition = "opacity 10s";
        newElm.setAttribute("class", "card");
        newElm.addEventListener("click", flipCard);
        newElm.style.padding = "15px";
        zindexNumber += 1;



        parent.appendChild(newElm);
    });
}

function whenLoad() {
    var parent = document.getElementById("deck");
    parent.style.position = "relative";
    //deck will be an array of Card objects
    deck = [];
    //faceImg stores the "front" img of the cards
    var faceImg = [
        "Deck%20of%20cards/ace.png",
        "Deck%20of%20cards/king.png",
        "Deck%20of%20cards/queen.png",
        "Deck%20of%20cards/jack.png",
        "Deck%20of%20cards/10.png",
        "Deck%20of%20cards/9.png",
        "Deck%20of%20cards/8.png",
        "Deck%20of%20cards/7.png",
        "Deck%20of%20cards/6.png",
        "Deck%20of%20cards/5.png",
        "Deck%20of%20cards/4.png",
        "Deck%20of%20cards/3.png",
        "Deck%20of%20cards/2.png"
    ];

    createDeck(deck, faceImg, parent);
}

setInterval(clearCard,10);