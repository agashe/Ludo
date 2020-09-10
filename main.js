/**
 * Ludo v1.0.0
 * 
 * Author: Mohamed Yousef <engineer.mohamed.yousef@gmail.com>
 * Copyrights: Ludo (C) 2020
 */

/* ***** Define Basic Elements & Flags ***** */
var counter  = 10;
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
    stop     : 4,
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

var Player = function(name, type, home, color, finish, tokens){
    this.name   = name;
    this.type   = type;
    this.home   = home;
    this.color  = color;
    this.finish = finish;
    this.tokens = tokens;
};


/* ***** Actions & Processing ***** */
function initGame(){
    // Initialize The Game Board
    var i = 0, color = 0;
    for (i = 0;i < 72;i++) {
        if (i >= 0 && i < 18)      color = playersColors.green;
        else if (i >= 18 && i < 36) color = playersColors.yellow;
        else if (i >= 36 && i < 54) color = playersColors.blue;
        else if (i >= 54 && i < 72) color = playersColors.red;
        
        tiles.push(new Tile(('#t-' + i), tilesTypes.normal, color));
    }

    // Green Track
    tiles[5].type  = tilesTypes.start;
    tiles[6].type  = tilesTypes.stop;
    tiles[1].type  = tilesTypes.toFinish;
    
    tiles[4].type  = tilesTypes.finish;
    tiles[7].type  = tilesTypes.finish;
    tiles[10].type = tilesTypes.finish;
    tiles[13].type = tilesTypes.finish;
    tiles[16].type = tilesTypes.finish;
    
    // Yellow Track
    tiles[34].type = tilesTypes.start;
    tiles[21].type = tilesTypes.stop;
    tiles[29].type = tilesTypes.toFinish;
    
    tiles[24].type = tilesTypes.finish;
    tiles[25].type = tilesTypes.finish;
    tiles[26].type = tilesTypes.finish;
    tiles[27].type = tilesTypes.finish;
    tiles[28].type = tilesTypes.finish;
    
    // Blue Track
    tiles[48].type = tilesTypes.start;
    tiles[47].type = tilesTypes.stop;
    tiles[52].type = tilesTypes.toFinish;
    
    tiles[37].type = tilesTypes.finish;
    tiles[40].type = tilesTypes.finish;
    tiles[43].type = tilesTypes.finish;
    tiles[46].type = tilesTypes.finish;
    tiles[49].type = tilesTypes.finish;
    
    // Red Track
    tiles[55].type = tilesTypes.start;
    tiles[60].type = tilesTypes.stop;
    tiles[68].type = tilesTypes.toFinish;
    
    tiles[61].type = tilesTypes.finish;
    tiles[62].type = tilesTypes.finish;
    tiles[63].type = tilesTypes.finish;
    tiles[64].type = tilesTypes.finish;
    tiles[65].type = tilesTypes.finish;

    
    // Initialize Players
    players[0] = new Player('PLAYER', playersTypes.human, '#player-home', playersColors.blue, '#player-finish', [
        new Token('#player-token1', '#player-home-p1'),
        new Token('#player-token2', '#player-home-p2'),
        new Token('#player-token3', '#player-home-p3'),
        new Token('#player-token4', '#player-home-p4'),
    ]);
    
    players[1] = new Player('COM #1', playersTypes.computer, '#com1-home', playersColors.red, '#com1-finish', [
        new Token('#com1-token1', '#com1-home-p1'),
        new Token('#com1-token2', '#com1-home-p2'),
        new Token('#com1-token3', '#com1-home-p3'),
        new Token('#com1-token4', '#com1-home-p4'),
    ]);
    
    players[2] = new Player('COM #2', playersTypes.computer, '#com2-home', playersColors.green, '#com2-finish', [
        new Token('#com2-token1', '#com2-home-p1'),
        new Token('#com2-token2', '#com2-home-p2'),
        new Token('#com2-token3', '#com2-home-p3'),
        new Token('#com2-token4', '#com2-home-p4'),
    ]);
    
    players[3] = new Player('COM #3', playersTypes.computer, '#com3-home', playersColors.yellow, '#com3-finish', [
        new Token('#com3-token1', '#com3-home-p1'),
        new Token('#com3-token2', '#com3-home-p2'),
        new Token('#com3-token3', '#com3-home-p3'),
        new Token('#com3-token4', '#com3-home-p4'),
    ]);
}

function random(min, max){
    return Math.floor(Math.random() * max) + min;
}

function playerTimer(){
    var timer = setInterval(function(){
        $('.timer').html(counter);

        if (counter == 0) {
            clearInterval(timer);
        } else {
            counter -= 1;
        }
    }, 1000);
}

function rollDice(){
    var counter  = 10;
    dice = random(1, 6);
    var timer = setInterval(function(){
        $('.dice .xsmall-circle').html(random(1, 6)); // just generate some values!!

        if (counter == 0) {
            clearInterval(timer);
            $('.dice .xsmall-circle').html(dice);
        } else {
            counter -= 1;
        }
    }, 150);
}

function setPlayer(id){
    $('#player-box .name').html(players[id].name);
    $('#player-box .name').removeClass(playersColors.blue+' '+
        playersColors.red+' '+
        playersColors.green+' '+
        playersColors.yellow);
    $('#player-box .name').addClass(players[id].color);
}

/* ***** Main Loop ***** */
$(document).ready(function(){
    initGame();

    while (counter != 0) {
        if (counter == 10) {
            setPlayer(current);
            rollDice();
            playerTimer();
        }
        else if (counter == 0) {
            if (winner !== false) {
                break;
            }
            else {
                counter = 10;
                if (current == 3) {
                    current = 0;
                } else {
                    current += 1;
                }
            } 
        }
        else {
            continue;
        }
    }
});