
var Deck = [];
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

//this information could be save locally for the duration of the gem
// to abide with obj coding rules.
var successFullFlips = 0;
var playerLoggedIn = false;
var firstCard = null;
var secondCard = null;
var playerStats = null;
var timer = null;
var timeInterval = 0;
////////////////////////////////////////////////////////////////////
//this code is used to log-in using Facebook

function Stats(clicks, time, addGameAmount, ID) {
    this.clicks = clicks;
    this.time = time;
    this.totalGames = addGameAmount;
    this.ID = ID;
}

function StatsWithMethods(clicks, time, addGameAmount, ID){

    Stats.call(this, clicks, time,addGameAmount, ID);

    this.timeAverageMean = function () {
        var timeSum = 0;

        this.time.forEach(function (t) {
            timeSum += t;
        });

        if (timeSum !== 0){
            return timeSum / this.totalGames;
        }
        else
            return timeSum;
    };

    this.recentGameTime = function () {
        if(this.time.length)
            return this.time[this.time.length - 1];
        else
            return 0;
    }
}


// This is called with the results from from FB.getLoginStatus().
function statusCheck(response) {

    if (response.status === 'connected') {
        // Logged into your app and Facebook.
            initialLogIn(response);
    } else {
        // The person is not logged into your app or we are unable to tell.
        alert("please log in so we can save your stats, no personal information will be stored");
        playerLoggedIn = false;
    }
}

function initialLogIn(response) {
    document.getElementById("log").value = "Log out";
    playerLoggedIn = true;
    loadStats(response);

}
// this function will load player stats if the player has logged in else it will
// inform the user his game stats will not be stored.
function logInButton() {

    FB.getLoginStatus(function(response) {
        if(response.status === 'connected'){
            FB.logout(function (secondResponse) {
                if(secondResponse.status !== 'connected'){
                    playerLoggedIn = false;
                    console.log("player has logged out");
                    document.getElementById("log").value = "Log in";
                }
                else {
                    console.log("player did not log out");
                }
            });
        }
        else {
            FB.login(function(response) {
                if (response.status === 'connected') {
                    // Logged into your app and Facebook.
                    alert("player has connected");
                    playerLoggedIn = true;
                    loadStats(response)
                } else {
                    // The person is not logged into this app or we are unable to tell.
                    alert("player has not connected");
                    playerLoggedIn =false;
                }
            });
        }
    });


}

function displayPlayerStats(){
    document.getElementById("stats").innerHTML = "Average Time: "+ String(Math.round(playerStats.timeAverageMean()))
        + 's'+ "<br>"+ "Recent time: " + String(playerStats.recentGameTime()) + 's' + "<br>" +
        "Clicks: " + String(playerStats.clicks);
}

function loadStats(response) {

    var stats = null;

    var storedString = localStorage.getItem(String(response.authResponse.userID));

    console.log(String(response.authResponse.userID));

    if(storedString !== null){
        stats = JSON.parse(storedString);
    }

    console.log(JSON.stringify(stats));
    if(stats !== null){
        console.log("LoadStats function is activating stats !== null");
        if(stats.clicks === undefined)
            stats.clicks = 0;
        playerStats = new StatsWithMethods(stats.clicks, stats.time, stats.totalGames,stats.ID);
        displayPlayerStats(playerStats);
    }
    else {
        console.log("LoadStats function is activating stats === null");
        var time = [];
        playerStats = new StatsWithMethods(0, time, 0, response.authResponse.userID);
        displayPlayerStats(playerStats);
    }

}

function saveStats() {
    var stats = new Stats(playerStats.clicks, playerStats.time, playerStats.totalGames, playerStats.ID);

    console.log(String(stats.ID));

    var stringifiedStats = JSON.stringify(stats);
    localStorage.setItem(String(stats.ID),stringifiedStats);

}
////////////////////////////////////////////////////////////////////////////////////////


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

        }
    }

}

function stackDeck(DeckIndex) {
    if(DeckIndex < Deck.length){
        Deck[DeckIndex].elm.style.left = "-140px";
        Deck[DeckIndex].elm.style.top = "130px";
        Deck[DeckIndex].reset();
        Deck[DeckIndex].faceHasFlipped = true;

        //card is not flipping because in Card.showBack faceHasFlipped needs to be true
        //for the flipping to commence. but its set as false because of the reset.
        var time = setInterval(function () {
            Deck[DeckIndex].showBack(time);
        });
        stackDeck(DeckIndex+1);



    }
}

function completeGame() {
    successFullFlips = 0;
    var deckIndex = 0;

    clearInterval(timer);

    if(playerLoggedIn){

        playerStats.time.push(timeInterval);
        playerStats.totalGames += 1;
        saveStats();
        displayPlayerStats();
    }

    stackDeck(deckIndex);
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
                        completeGame();
                    }
                }
            }, 1000);
        }
        else {
            alert("this card has been flipped");
            secondCard = null;
        }
    }

    if(playerLoggedIn){
        playerStats.clicks += 1;
    }

}

function setDeck() {
    var count = 0;
    var shuffled = shuffleLocation();

    //creates a deck of cards and assigns them there location on the screen
    shuffled.forEach(function (t) {
        var card = new Card(t.x,t.y, count);
        count += 1;
        card.setCard();
        Deck.push(card);
    });

    //start time.
    timer = setInterval(function () {
        timeInterval += 1;
        if(playerLoggedIn){
            displayPlayerStats();
        }
    },1000)

}

function restGame(){
    var shuffled = shuffleLocation();
    for( var i = 0; i < shuffled.length; i++){
        Deck[i].reset();
        Deck[i].moveCard(shuffled[i].x,shuffled[i].y);
    }
    timeInterval = 0;
    timer = setInterval(function () {
        timeInterval += 1;
        if(playerLoggedIn){
            displayPlayerStats();
        }
    },1000)
}

//time keeping needs to be re-designed. keeping track of time will not be enough? or as easy as thought
// resetGame, stackDeck, calulateTime will need to be changed before pushing.