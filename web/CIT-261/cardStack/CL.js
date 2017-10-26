var deck;

function Card(faceImg, elm) {
        this.backImg = "Deck%20of%20cards/back2.png";
        this.faceImg = faceImg;
        this.angle = 0;
        this.elm = elm;
        this.hasFliped = false;
        this.flipingBack = false;
        this.doneFliping = false;
        this.changeCardImg = function () {
            this.elm.src = this.faceImg;
            this.hasFliped = false;
            this.flipingBack = true;
        };
        this.flip = function () {
            if(!this.hasFliped){
                var elmTrans = "rotateY(" + this.angle + "deg)";
                this.elm.style.transform = elmTrans;
                if(!this.flipingBack){
                    this.angle += 1;
                    if(this.angle%90 === 0){
                        this.hasFliped = true;
                    }
                    else{
                        if(this.angle >= 0){
                            angle =- 1;
                            }
                        else {
                            this.doneFliping = true;
                        }
                    }
                }
                else {
                    this.changeCardImg();
                }
            }
        };
}

function createDeck(deck, faceImg, parent) {
    faceImg.forEach(function (t) {
        //create new card and element
        var newElm = document.createElement("IMG");
        var newCard = new Card(t, newElm);

        //push new card into the deck array
        deck.push(newCard);

        //add the new element to the html file
        newElm.src = newCard.backImg;
        parent.appendChild(newElm);
    });
}

function whenLoad() {
    var parent = document.getElementById("deck");
    //deck will be an array of Card objects
    deck = [];
    //faceImg stores the "front" img of the cards
    var faceImg = [
        "Deck%20of%20cards/back2.png",
        "Deck%20of%20cards/ace.png",
        "Deck%20of%20cards/king.png",
        "Deck%20of%20cards/queen.png",
        "Deck%20of%20cards/10.png",
        "Deck%20of%20cards/9.png",
        "Deck%20of%20cards/8.png",
        "Deck%20of%20cards/7.png",
        "Deck%20of%20cards/6.png",
        "Deck%20of%20cards/.5png",
        "Deck%20of%20cards/.4png",
        "Deck%20of%20cards/3.png",
        "Deck%20of%20cards/2.png"
    ];

    createDeck(deck, faceImg, parent);
}