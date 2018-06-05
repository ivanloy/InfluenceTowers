var grid;
var piece;
var delay;
var ticks;

function setup() {

    createCanvas(800, 800);
    grid = new Grid();
    piece = new CurrentPiece();
    delay = 3;
    ticks = 0;
    piece.setPiece(grid, 'I', 0, 2);

}

function draw() {

    background(100);

    ticks++;

    if(ticks >= delay){

        ticks = 0;
        if(!piece.movePieceDown())
            piece.setPiece(grid, 'I', 0, 2);

    }

    grid.drawGrid();

}
