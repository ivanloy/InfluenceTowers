var grid;
var piece;
var delay;
var ticks;
var dasDelay; //TODO DAS
var dasDelayTicks;
var moveKeyPressed;
var rotationKeyPressed;
var hardDropPressed;
var score;
var lines;
var pieces;
var sprites;

function preload() {
    pieces = loadImage("n9.png");
}

function setup() {
    noStroke();
    createCanvas(700, 600);
    piece = new CurrentPiece();
    sprites = [
        pieces.get(16*6, 0, 16, 16),
        pieces.get(16*7, 0, 16, 16),
        pieces.get(16*3, 0, 16, 16),
        pieces.get(16*4, 0, 16, 16),
        pieces.get(16*5, 0, 16, 16),
        pieces.get(16*2, 0, 16, 16),
        pieces.get(16*8, 0, 16, 16),
    ]
    grid = new Grid(sprites);
    delay = 7;
    score = 0;
    lines = 0;
    rotationKeyPressed = false;
    hardDropPressed = false;
    ticks = 0;
    dasDelay = 9;
    dasDelayTicks = 0;
    piece.setPiece(grid, int(random(0,7)), 0, 3, 0);

}

function draw() {

    background(100);
    //image(sprites[1], 300, 300, 200, 200);
    ticks++;
    dasDelayTicks++;
    image(pieces.get(0, 0, 16, 16), width - 100, 10, 30, 30);
    fill(255);
    textSize(30);
    text("SCORE: " + score, grid.gridWidth * 30 + 30, 50);
    text("LINES: " + lines, grid.gridWidth * 30 + 30, 100);
    if(ticks >= delay || keyIsDown(DOWN_ARROW)){

        ticks = 0;

        if(!piece.movePieceDown()) {

            var nLines = piece.deleteLines();
            addPoints(nLines);
            piece.setPiece(grid, int(random(0, 7)), 0, 3, 2);

        }

    }

    if(keyIsDown(32) && !hardDropPressed) {

        piece.hardDrop();
        hardDropPressed = true;
        var nLines = piece.deleteLines();
        addPoints(nLines);
        piece.setPiece(grid, int(random(0,7)), 0, 3, 2);

    }

    if(keyIsDown(UP_ARROW) && !rotationKeyPressed){ //TODO Weird flashing, do this calc first, then set piece, still not working

        piece.rotatePieceClockwise();
        dasDelayTicks = 0;
        rotationKeyPressed = true;

    }else if(keyIsDown(90) && !rotationKeyPressed) { //TODO Weird flashing, do this calc first, then set piece, still not working

        piece.rotatePieceAntiClockwise();
        dasDelayTicks = 0;
        rotationKeyPressed = true;
    }

    if(keyIsDown(RIGHT_ARROW) && !moveKeyPressed){

        piece.movePieceRight();
        dasDelayTicks = 0;
        moveKeyPressed = true;

    }else if(keyIsDown(LEFT_ARROW) && !moveKeyPressed) {

        piece.movePieceLeft();
        dasDelayTicks = 0;
        moveKeyPressed = true;

    }

    if(keyIsDown(RIGHT_ARROW) && moveKeyPressed && dasDelayTicks >= dasDelay)
        piece.movePieceRight();

    if(keyIsDown(LEFT_ARROW) && moveKeyPressed && dasDelayTicks >= dasDelay)
        piece.movePieceLeft();




    grid.drawGrid();

}

function keyReleased(){

    if(keyCode === 32)
        hardDropPressed = false;
    if(keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW)
        moveKeyPressed = false;
    if(keyCode === UP_ARROW || keyCode === 90)
        rotationKeyPressed = false;

}

function addPoints(nLines){

    if     (nLines === 1) score += 40;
    else if(nLines === 2) score += 100;
    else if(nLines === 3) score += 300;
    else if(nLines === 4) score += 1200;

    lines += nLines; //TODO Cohesion

}