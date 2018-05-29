var gridSize = 100;
var grid = [];
var antX = gridSize / 2;
var antY = gridSize / 2;
var antOrientation = 0; //(0 - Right, 1 - Down, 2 - Left, 3 - Up)

function setup() {

    frameRate(60);
    createCanvas(900,900);
    noStroke();

    for (var i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (var j = 0; j < gridSize; j++) {
            grid[i][j] = 0;
        }
    }
    background(31);
}

function draw() {

    for(var i = 0; i < 50; i++) {

        turnAnt();
        drawAntBox();
        moveAnt();

    }

    //print(antX, antY, antOrientation);
}

function drawBoard(){ //TODO JSON FILE LOAD

    var cellSize = height / gridSize

    for(var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {

            if     (grid[i][j] == 0) fill('#313131');
            else if(grid[i][j] == 1) fill('#FFFFFF');
            else if(grid[i][j] == 2) fill('#FF0000');
            rect(i * cellSize, j * cellSize, cellSize, cellSize);

        }
    }

}

function drawAntBox() {

    var cellSize = height / gridSize

    if     (grid[antX][antY] == 0)  fill('#313131');
    else if(grid[antX][antY] == 1)  fill('#FFFFFF');
    else if(grid[antX][antY] == 2)  fill('#FF0000');
    else if(grid[antX][antY] == 3)  fill('#00FF00')
    else if(grid[antX][antY] == 4)  fill('#0000FF');
    else if(grid[antX][antY] == 5)  fill('#FFFF00');
    else if(grid[antX][antY] == 6)  fill('#00FFFF');
    else if(grid[antX][antY] == 7)  fill('#FF00FF');
    else if(grid[antX][antY] == 8)  fill('#b06929');
    else if(grid[antX][antY] == 9)  fill('#46f5ff');
    else if(grid[antX][antY] == 10) fill('#59897f');



    rect(antX * cellSize, antY * cellSize, cellSize, cellSize);

}

function turnAnt(){ //TODO Proper method for this

    if(grid[antX][antY] == 0 || grid[antX][antY] == 1){

        grid[antX][antY] = 2;
        turnClockwise();

    }else if(grid[antX][antY] == 2){

        grid[antX][antY] = 3;
        turnClockwise();

    }else if(grid[antX][antY] == 3){

        grid[antX][antY] = 4;
        turnAntiClockwise();

    }else if(grid[antX][antY] == 4){

        grid[antX][antY] = 5;
        turnAntiClockwise();

    }else if(grid[antX][antY] == 5){

        grid[antX][antY] = 6;
        turnClockwise();

    }else if(grid[antX][antY] == 6){

        grid[antX][antY] = 7;
        turnAntiClockwise();

    }else if(grid[antX][antY] == 7){

        grid[antX][antY] = 8;
        turnAntiClockwise();

    }else if(grid[antX][antY] == 8){

        grid[antX][antY] = 9;
        turnAntiClockwise();

    }else if(grid[antX][antY] == 9){

        grid[antX][antY] = 10;
        turnClockwise();

    }else{

        grid[antX][antY] = 1;
        turnAntiClockwise();

    }

}

function turnClockwise() {

    antOrientation++;
    if(antOrientation > 3) antOrientation = 0;

}

function turnAntiClockwise() {

    antOrientation--;
    if(antOrientation < 0) antOrientation = 3;

}

function moveAnt() {

    if(antOrientation == 0 && antX < gridSize - 1)
        antX++;
    else if(antOrientation == 1 && antY < gridSize - 1)
        antY++;
    else if(antOrientation == 2 && antX > 0)
        antX--;
    else if(antOrientation == 3 && antX > 0)
        antY--;


}
