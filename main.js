/**
 * Ludo v1.0.0
 * 
 * Author: Mohamed Yousef <engineer.mohamed.yousef@gmail.com>
 * Copyrights: Ludo (C) 2020
 */

/* ***** Define Basic Elements & Flags ***** */
var mainLoop = 0;
var current  = 0;
var winner   = false;
var players  = [];
var tiles    = [];
var dice     = 1;

const tilesTypes = {
    normal   : 0,
    start    : 1,
    toFinish : 2,
    finish   : 3,
    safe     : 4,
};

const playersTypes = {
    human    : 0,
    computer : 1,
};

const playersColors = {
    blue   : 'blue',
    red    : 'red',
    green  : 'green',
    yellow : 'yellow',
};

var Tile = function(selector, type, color){
    this.selector = selector;
    this.type     = type;
    this.color    = color;
};

var Token = function(selector, location){
    this.selector = selector;
    this.location = location;
};

var Player = function(name, type, home, color, finish, tokens, 
        startTile, toFinishTile, firstFinishTile, activeToken, tokensInFinish){
        this.name   = name;
        this.type   = type;
        this.home   = home;
        this.color  = color;
        this.finish = finish;
        this.tokens = tokens;
        
        this.startTile       = startTile;
        this.toFinishTile    = toFinishTile;
        this.firstFinishTile = firstFinishTile;
        this.activeToken     = activeToken;
        this.tokensInFinish  = tokensInFinish;
};


/* ***** Actions & Processing ***** */
function initGame(){
    // Initialize The Game Board
    var i = 0, type = '', color = 0;
    for (i = 0;i < 72;i++) {
        // Red Track
        if (i == 1) {
            type  = tilesTypes.start;
            color = playersColors.red;
        }
        else if (i == 48) {
            type  = tilesTypes.safe;
            color = playersColors.red;
        }
        else if (i == 51) {
            type  = tilesTypes.toFinish;
            color = playersColors.red;
        }
        else if (i >= 52 && i <=56) {
            type  = tilesTypes.finish;
            color = playersColors.red;
        }
        
        // Green Track
        else if (i == 14) {
            type  = tilesTypes.start;
            color = playersColors.green;
        }
        else if (i == 9) {
            type  = tilesTypes.safe;
            color = playersColors.green;
        }
        else if (i == 12) {
            type  = tilesTypes.toFinish;
            color = playersColors.green;
        }
        else if (i >= 57 && i <=61) {
            type  = tilesTypes.finish;
            color = playersColors.green;
        }
        
        // Yellow Track
        else if (i == 27) {
            type  = tilesTypes.start;
            color = playersColors.yellow;
        }
        else if (i == 21) {
            type  = tilesTypes.safe;
            color = playersColors.yellow;
        }
        else if (i == 25) {
            type  = tilesTypes.toFinish;
            color = playersColors.yellow;
        }
        else if (i >= 62 && i <= 66) {
            type  = tilesTypes.finish;
            color = playersColors.yellow;
        }

        // Blue Track
        else if (i == 40) {
            type  = tilesTypes.start;
            color = playersColors.blue;
        }
        else if (i == 35) {
            type  = tilesTypes.safe;
            color = playersColors.blue;
        }
        else if (i == 38) {
            type  = tilesTypes.toFinish;
            color = playersColors.blue;
        }
        else if (i >= 67 && i <= 71) {
            type  = tilesTypes.finish;
            color = playersColors.blue;
        }

        // Defualt
        else {
            type  = tilesTypes.normal;
            color = '';
        }

        tiles.push(new Tile(('#t-' + i), type, color));
    }
    
    // Initialize Players
    players[0] = new Player('PLAYER', playersTypes.human, '#player-home', 
        playersColors.blue, '#player-finish span', [
        new Token('#player-token1', false),
        new Token('#player-token2', false),
        new Token('#player-token3', false),
        new Token('#player-token4', false),
    ], 40, 38, 67, false, 0);
    
    players[1] = new Player('COM #1', playersTypes.computer, '#com1-home', 
        playersColors.red, '#com1-finish span', [
        new Token('#com1-token1', false),
        new Token('#com1-token2', false),
        new Token('#com1-token3', false),
        new Token('#com1-token4', false),
    ], 1, 51, 52, false, 0);
    
    players[2] = new Player('COM #2', playersTypes.computer, '#com2-home', 
        playersColors.green, '#com2-finish span', [
        new Token('#com2-token1', false),
        new Token('#com2-token2', false),
        new Token('#com2-token3', false),
        new Token('#com2-token4', false),
    ], 14, 12, 57, false, 0);
    
    players[3] = new Player('COM #3', playersTypes.computer, '#com3-home', 
        playersColors.yellow, '#com3-finish span', [
        new Token('#com3-token1', false),
        new Token('#com3-token2', false),
        new Token('#com3-token3', false),
        new Token('#com3-token4', false),
    ], 27, 25, 62, false, 0);
}

function tileSelector(id){
    return '#t-' + id;
}

function random(min, max){
    return Math.floor(Math.random() * max) + min;
}

function getTokenID(selector){
    for (var i = 0;i < 4;i++) {
        if (players[current].tokens[i].selector == ('#' + selector)) return i;
    }
}

function playerTimer(){
    var counter  = 2;
    var timer = setInterval(function(){
        $('.timer').html(counter);

        if (counter == 0) {
            clearInterval(timer);
            decideNextPlayer();
        } else {
            counter -= 1;
        }
    }, 1000);
    $('.timer').html('2');
}

function rollDice(){
    var counter  = 10;
    dice = random(1, 6);
    var timer = setInterval(function(){
        $('.dice .xsmall-circle').html(random(1, 6)); // just generate some values!!

        if (counter == 0) {
            clearInterval(timer);
            $('.dice .xsmall-circle').html(dice);

            if (current > 0) {
                handleComputerPlayerTurn();
            }
        } else {
            counter -= 1;
        }
    }, 150);
}

function setPlayer(){
    $('#player-box .name').html(players[current].name);
    $('#player-box .name').removeClass(playersColors.blue+' '+
        playersColors.red+' '+
        playersColors.green+' '+
        playersColors.yellow);
    $('#player-box .name').addClass(players[current].color);    
    playerTimer();
}

function moveToken(currentPlayer, token, distination){
    var source = players[currentPlayer].tokens[token].location;

    var moves = 0;
    if (source > distination) {
        moves  = distination - (source - 52);
    } else {
        moves  = distination - source;
    }

    var timer = setInterval(function(){
        $(players[currentPlayer].tokens[token].selector).appendTo(tileSelector(source));

        // fix glitch : for xsmall-circle , and toFinish triangles !!
        if (tiles[source].type == tilesTypes.safe) {
            $(players[currentPlayer].tokens[token].selector).css('top', '-33px');
        }
        else if (tiles[source].type == tilesTypes.toFinish) {
            $(players[currentPlayer].tokens[token].selector).css('top', '-30px');
        } 
        else {
            $(players[currentPlayer].tokens[token].selector).css('top', '-2px');
        }

        if (moves == 0) {
            clearInterval(timer);
        } else {
            moves -= 1;
            
            if (source == 51) {
                source = 0;
            } else {
                source = source + 1;
            }
        }
    }, 500);

    players[currentPlayer].tokens[token].location = distination;
}

function moveTokenToFinish(currentPlayer, token, currentLocation, distination){
    var source = currentLocation;
    var moves  = players[currentPlayer].toFinishTile - currentLocation;
    moves += (distination - players[currentPlayer].firstFinishTile) + 1;

    // first: move the token to the toFinishTile!
    // second: move the token inside the finish tiles
    // if there're avilable moves to do on them !!
    var timer = setInterval(function(){
        if (source == (players[currentPlayer].firstFinishTile + 5)) {
            clearInterval(timer);
            putTokenInsideFinishPoint(currentPlayer, token);
            return;
        }

        $(players[currentPlayer].tokens[token].selector).appendTo(tileSelector(source));

        // fix glitch : for xsmall-circle , and toFinish triangles !! 
        if (source < 72 && tiles[source].type == tilesTypes.safe) {
            $(players[currentPlayer].tokens[token].selector).css('top', '-33px');
        }
        else if (source < 72 && tiles[source].type == tilesTypes.toFinish) {
            $(players[currentPlayer].tokens[token].selector).css('top', '-30px');
        }
        else {
            $(players[currentPlayer].tokens[token].selector).css('top', '-2px');
        }
    
        if (moves == 0) {
            clearInterval(timer);
        } else {
            moves -= 1;

            if (source == players[currentPlayer].toFinishTile) {
                source = players[currentPlayer].firstFinishTile;
            } 
            else {
                source = source + 1;
            }
        }
    }, 500);

    players[currentPlayer].tokens[token].location = distination;
}

function moveTokenInFinish(currentPlayer, token, currentLocation, distination){
    // if i am inside the finish tiles and i got dice 
    // larger than the finish points , then do nothing!!
    if (distination > (players[currentPlayer].firstFinishTile + 5)) {
        return;
    }

    var source = currentLocation;
    var moves  = distination - currentLocation;

    var timer = setInterval(function(){
        if (source == (players[currentPlayer].firstFinishTile + 5)) {
            clearInterval(timer);
            putTokenInsideFinishPoint(currentPlayer, token);
            return;
        }

        $(players[currentPlayer].tokens[token].selector).appendTo(tileSelector(source));
        $(players[currentPlayer].tokens[token].selector).css('top', '-2px');
    
        if (moves == 0) {
            clearInterval(timer);
        } else {
            moves -= 1;
            source = source + 1;
        }
    }, 500);

    players[currentPlayer].tokens[token].location = distination;
}

function putTokenInsideFinishPoint(currentPlayer, token){
    players[currentPlayer].tokensInFinish += 1;
    players[currentPlayer].activeToken = false;
    $(players[currentPlayer].finish).html(players[currentPlayer].tokensInFinish);
    $(players[currentPlayer].tokens[token].selector).hide();
}

function handleHumanPlayerTurn(selectedToken){
    var moveToFinish = false;
    var moveInFinish = false;

    if (current == 0) {
        if (players[current].tokens[selectedToken].location == false) {
            if (dice > 1) {
                players[current].tokens[selectedToken].location = players[current].startTile;
                $(players[current].tokens[selectedToken].selector).appendTo(tileSelector(players[current].startTile));
                $(players[current].tokens[selectedToken].selector).css('top', '-2px');
            }
        } else {
            newLocation = players[current].tokens[selectedToken].location + dice;
            
            // if the token reached my toFinish tile
            if (newLocation > players[current].firstFinishTile && 
                players[current].tokens[selectedToken].location <= players[current].toFinishTile) {
                    moveInFinish = true;
            }

            // if the token reached my toFinish tile
            if (newLocation > players[current].toFinishTile && moveInFinish == false &&
                players[current].tokens[selectedToken].location < players[current].toFinishTile) {
                    newLocation  = (newLocation - players[current].toFinishTile) - 1;
                    newLocation += players[current].firstFinishTile;
                    moveToFinish = true;
            }

            // if the token reached the tile number 50 , continue !
            if (newLocation > 51 && moveToFinish == false && moveInFinish == false) {
                newLocation = newLocation - 52;
            }

            if (moveInFinish == true) {
                moveTokenInFinish(current, selectedToken, players[current].tokens[selectedToken].location, newLocation);
            } 
            else if (moveToFinish == true) {
                moveTokenToFinish(current, selectedToken, players[current].tokens[selectedToken].location, newLocation);
            } 
            else {
                moveToken(current, selectedToken, newLocation);
            }
        }
    }
}

function handleComputerPlayerTurn(){
    var activeToken  = false;
    var newLocation  = false;
    var moveToFinish = false;
    var moveInFinish = false;

    if (players[current].activeToken === false) {
        if (dice > 1) {
            activeToken = players[current].tokensInFinish;
            players[current].activeToken = activeToken;

            players[current].tokens[activeToken].location = players[current].startTile;
            $(players[current].tokens[activeToken].selector).appendTo(tileSelector(players[current].startTile));
            $(players[current].tokens[activeToken].selector).css('top', '-2px');
        }
    } else {
        activeToken = players[current].activeToken;
        newLocation = players[current].tokens[activeToken].location + dice;

        // if the token reached my toFinish tile
        if (newLocation > players[current].firstFinishTile && 
            players[current].tokens[activeToken].location > players[current].toFinishTile) {
                moveInFinish = true;
        }

        // if the token reached my toFinish tile
        if (newLocation > players[current].toFinishTile && moveInFinish == false &&
            players[current].tokens[activeToken].location <= players[current].toFinishTile) {
                newLocation  = (newLocation - players[current].toFinishTile) - 1;
                newLocation += players[current].firstFinishTile;
                moveToFinish = true;
        }

        // if the token reached the tile number 50 , continue !
        if (newLocation > 51 && moveToFinish == false && moveInFinish == false) {
            newLocation = newLocation - 52;
        }

        if (moveInFinish == true) {
            moveTokenInFinish(current, activeToken, players[current].tokens[activeToken].location, newLocation);
        } 
        else if (moveToFinish == true) {
            moveTokenToFinish(current, activeToken, players[current].tokens[activeToken].location, newLocation);
        } 
        else {
            moveToken(current, activeToken, newLocation);
        }
    }
}

function decideNextPlayer(){
    if (current == 3) {
        current = 0;
    } else {
        current += 1;
    }
}

function checkWinner(){
    if (winner !== false) {
        clearInterval(mainLoop);
    }
}


/* ***** Main Loop ***** */
$(document).ready(function(){
    initGame();
    
    // First Turn
    setPlayer();
    rollDice();

    // The Main Loop
    mainLoop = setInterval(function(){
        checkWinner();

        setPlayer();
        rollDice();
        turnFinish = 0;
    }, 5000);

    // Human Player Handler
    var turnFinish = 0; // to prevent multiple click !!
    $('[id^=player-token]').click(function(){
        if (turnFinish == 0 && current == 0) {
            handleHumanPlayerTurn(getTokenID($(this).attr('id')));
            turnFinish = 1;
        }
    });
});