var grid;
var piece;
var delay;
var ticks;
var keyDelay;
var keyTicks;

function setup() {

    createCanvas(800, 700);
    grid = new Grid();
    piece = new CurrentPiece();
    delay = 5;
    keyDelay = 4; //TODO DAS and single move

    ticks = 0;
    keyTicks = 0;
    piece.setPiece(grid, 'O', 3, 2);

}

function draw() {

    background(100);

    ticks++;
    keyTicks++;

    if(ticks >= delay){

        ticks = 0;
        if(!piece.movePieceDown())
            piece.setPiece(grid, 'O', 3, 2);

    }

    if(keyIsDown(RIGHT_ARROW) && keyTicks >= keyDelay){

        piece.movePieceRight();
        keyTicks = 0;

    }else if(keyIsDown(LEFT_ARROW) && keyTicks >= keyDelay){

        piece.movePieceLeft();
        keyTicks = 0;

    }

    grid.drawGrid();

}

