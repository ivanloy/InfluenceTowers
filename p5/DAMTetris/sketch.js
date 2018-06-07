var grid;
var piece;
var delay;
var ticks;
var keyDelay;
var keyTicks;

function setup() {
    noStroke();
    createCanvas(800, 700);
    grid = new Grid();
    piece = new CurrentPiece();
    delay = 7;
    keyDelay = 8; //TODO DAS and single move

    ticks = 0;
    keyTicks = 0;
    piece.setPiece(grid, int(random(0,7)), 0, 3, 2);

}

function draw() {

    background(100);

    ticks++;
    keyTicks++;

    if(ticks >= delay){

        ticks = 0;
        if(!piece.movePieceDown())
            piece.setPiece(grid, int(random(0,7)), 0, 3, 2);

    }

    if(keyIsDown(UP_ARROW) && keyTicks >= keyDelay){ //TODO Weird flashing, do this calc first, then set piece, still not working

        piece.rotatePieceClockwise();
        keyTicks = 0;

    }

    if(keyIsDown(RIGHT_ARROW) && keyTicks >= keyDelay){

        piece.movePieceRight();
        keyTicks = 0;

    }else if(keyIsDown(LEFT_ARROW) && keyTicks >= keyDelay) {

        piece.movePieceLeft();
        keyTicks = 0;
    }


    grid.drawGrid();

}

