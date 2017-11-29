var Deck = [];
var successFullFlips = 0;
var backDesign = "cardImg/back2.png";
var cardFace = [
    "cardImg/2.png",
    "cardImg/3.png",
    "cardImg/4.png",
    "cardImg/5.png",
    "cardImg/6.png",
    "cardImg/7.png",
    "cardImg/8.png",
    "cardImg/9.png"
];

var firstCard = null;
var secondCard = null;


// Fisher-Yates algorithm
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function shuffleLocation() {
    var location = [];
    for(var y = 0; y < 4; y++){
        for(var x = 0; x < 4; x++){

            location.push(new Coordinates(x,y));
        }
    }
     return shuffle(location);
}

function stackDeck(DeckIndex) {
    if(DeckIndex < Deck.length){
        Deck[DeckIndex].elm.style.left = "-140px";
        Deck[DeckIndex].elm.style.top = "80px";
        Deck[DeckIndex].reset();
        Deck[DeckIndex].faceHasFlipped = true;

        //card is not flipping because in Card.showBack faceHasFlipped needs to be true
        //for the flipping to commence. but its set as false because of the reset.
        var time = setInterval(function () {
            Deck[DeckIndex].showBack(time);
        });

        console.log(Deck[DeckIndex].cardFace);
        stackDeck(DeckIndex+1);
    }
}


function cardClick(idNum){
    if(firstCard === null){
        Deck.forEach(function (t) {
            if(t.count === idNum)
                firstCard = t;
        });
        if(!firstCard.faceHasFlipped){
            var firstTimer = setInterval(function () {
                firstCard.showFace(firstTimer);
            });
        }
        else{
            alert("this card has been flipped");
            firstCard = null;
        }

    }
    else if(secondCard === null && idNum !== firstCard.count){
        Deck.forEach(function (t) {
            if(t.count === idNum)
                secondCard = t;
        });
        if(!secondCard.faceHasFlipped) {
            var secondTimer = setInterval(function () {
                secondCard.showFace(secondTimer);
            });

            setTimeout(function () {
                if (secondCard.cardFace !== firstCard.cardFace) {
                    var thirdTimer = setInterval(function () {
                        firstCard.showBack(thirdTimer);
                        if (firstCard.doneFlipping && firstCard.faceHasFlipped) {
                            firstCard.reset();
                            firstCard = null;
                        }


                    });
                    var forthTimer = setInterval(function () {
                        secondCard.showBack(forthTimer);
                        if (secondCard.doneFlipping && secondCard.faceHasFlipped) {
                            secondCard.reset();
                            secondCard = null;
                        }


                    });
                }
                //if firstCard count === idNum the user has clicked the same card
                else if (firstCard.count === idNum) {
                    alert("please choose a different card");
                }
                else {
                    secondCard = null;
                    firstCard = null;
                    successFullFlips += 1;
                    if (successFullFlips === 8) {
                        successFullFlips = 0;
                        var deckIndex = 0;
                        stackDeck(deckIndex);
                    }
                }
            }, 1000);
        }
        else {
            alert("this card has been flipped");
            secondCard = null;
        }
    }
}

function Coordinates(x,y) {
    this.x = x*200;
    this.y = y*200;
}

function Card(xLocation, yLocation, count) {
    this.elm = document.getElementById("card_"+ count);
    this.xLocation = xLocation;
    this.yLocation = yLocation;
    this.count = count;
    this.cardFace = null;
    this.angle = 0;
    this.faceHasFlipped = false;
    this.hasItFlipped = false;
    this.doneFlipping = false;

    this.setCard = function () {
        this.elm.style.position = "absolute";
        this.moveCard(this.xLocation, this.yLocation);
        this.elm.style.transition = "left 4s, top 4s";
        this.cardFace = cardFace[this.count % 8];
    };

    this.moveCard = function (x,y) {
        this.xLocation = x;
        this.yLocation = y;
        this.elm.style.left = String(this.xLocation) + "px";
        this.elm.style.top = String(this.yLocation) + "px";
    };

    this.reset = function () {
        this.faceHasFlipped = false;
        this.hasItFlipped = false;
        this.doneFlipping = false;
    };

    this.showFace = function (timer) {
        if (this.angle < 95 && !this.hasItFlipped){
            this.elm.style.transform = "rotateY(" + this.angle + "deg)";
            this.angle += 1;
            if(this.angle > 90) {
                this.hasItFlipped = true;
                this.elm.firstElementChild.src = this.cardFace;
            }
        }
        else if(this.angle > 0 && !this.doneFlipping){
            this.elm.style.transform = "rotateY(" + this.angle + "deg)";
            this.angle -= 1;
            if(this.angle < 0) {
                this.doneFlipping = true;
            }
        }
        else{
            this.faceHasFlipped = true;
            this.hasItFlipped = false;
            this.doneFlipping = false;
            this.angle = 0;
            clearInterval(timer);
        }


    };
    this.showBack = function (time){
        if(this.faceHasFlipped){
            if (this.angle < 95 && !this.hasItFlipped){
                this.elm.style.transform = "rotateY(" + this.angle + "deg)";
                this.angle += 1;
                if(this.angle >= 90) {
                    this.hasItFlipped = true;
                    this.elm.firstElementChild.src = backDesign;
                }
            }
            else if(this.angle > 0 && !this.doneFlipping) {
                this.elm.style.transform = "rotateY(" + this.angle + "deg)";
                this.angle -= 1;
                if (this.angle <= 0) {
                    this.doneFlipping = true;
                    this.angle = 0;
                    clearInterval(time);
                }
            }
            /*else {
                this.doneFlipping = false;
                this.hasItFlipped = false;
            }*/
        }
    }

}


/*

set theme will change the suit of the deck and will change
the back design.

function setTheme() {

}*/

function setDeck() {
    var count = 0;

    var shuffled = shuffleLocation();

    //creates a deck of cards and assigns them there location on the screen
    shuffled.forEach(function (t) {
        var card = new Card(t.x,t.y, count);
        count += 1;
        card.setCard();
        Deck.push(card);
    })
}


function restGame(){
    var shuffled = shuffleLocation();
    for( var i = 0; i < shuffled.length; i++){
        Deck[i].reset();
        Deck[i].moveCard(shuffled[i].x,shuffled[i].y);
    }
}