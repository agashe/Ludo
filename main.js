/**
 * Ludo v1.0.0
 * 
 * Author: Mohamed Yousef <engineer.mohamed.yousef@gmail.com>
 * Copyrights: Ludo (C) 2020
 */

/* ***** Define Basic Elements & Flags ***** */
var counter  = 0;
var winner   = 0;
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
    blue   : 0,
    red    : 1,
    green  : 2,
    yellow : 3,
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

var Player = function(type, home, color, finish, tokens){
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
    players[0] = new Player(playersTypes.human, '#player-home', playersColors.blue, '#player-finish', [
        new Token('#player-token1', '#player-home-p1'),
        new Token('#player-token2', '#player-home-p2'),
        new Token('#player-token3', '#player-home-p3'),
        new Token('#player-token4', '#player-home-p4'),
    ]);
    
    players[1] = new Player(playersTypes.computer, '#com1-home', playersColors.red, '#com1-finish', [
        new Token('#com1-token1', '#com1-home-p1'),
        new Token('#com1-token2', '#com1-home-p2'),
        new Token('#com1-token3', '#com1-home-p3'),
        new Token('#com1-token4', '#com1-home-p4'),
    ]);
    
    players[2] = new Player(playersTypes.computer, '#com2-home', playersColors.green, '#com2-finish', [
        new Token('#com2-token1', '#com2-home-p1'),
        new Token('#com2-token2', '#com2-home-p2'),
        new Token('#com2-token3', '#com2-home-p3'),
        new Token('#com2-token4', '#com2-home-p4'),
    ]);
    
    players[3] = new Player(playersTypes.computer, '#com3-home', playersColors.yellow, '#com3-finish', [
        new Token('#com3-token1', '#com3-home-p1'),
        new Token('#com3-token2', '#com3-home-p2'),
        new Token('#com3-token3', '#com3-home-p3'),
        new Token('#com3-token4', '#com3-home-p4'),
    ]);
}


/* ***** Main Loop ***** */
$(document).ready(function(){
    initGame();
    // while (!winner) {

    // }
});