var board;
var towerData;

function preload(){

    towerData = loadJSON("towers.json");

}

function setup() {

    createCanvas(500, 500);
    board = new Board(10, towerData);
    var tower = new Tower(1, towerData);
    //board.tiles[0][0].tower = tower;

}

function draw() {

    background(31);

    board.printBoard();
    board.printTileInfo();
    fill(255);
    text(board.mapMouseX() + ", " +board.mapMouseY(), 20, 20);

}

function mousePressed(){ //TODO Check if Board should manage it itself

    board.placeTower();

}

function keyPressed() {

    if(key == "Q") board.rotateTowerClockwise();
    if(key == "E") board.rotateTowerCounterclockwise();

}