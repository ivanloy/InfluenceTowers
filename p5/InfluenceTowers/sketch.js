var board;
var towerData;

function preload(){

    towerData = loadJSON("towers.json");

}

function setup() {

    createCanvas(500, 500);
    board = new Board(10);
    var tower = new Tower(1, towerData);

}

function draw() {

    background(31);

    board.printBoard();
    board.printTileInfo();
    fill(255);
    text(board.mapMouseX() + ", " +board.mapMouseY(), 20, 20);

}