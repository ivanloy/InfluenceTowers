var tile = [];
var size;
var tile;
var offset;
var turn;
var orientation;

function setup() {

    createCanvas(500, 500);
    size = 10;
    tile = [];
    offset = 50;
    turn = 1;
    orientation = 0;

    for (var i = 0; i < size; i++) {
        tile[i] = []
        for (var j = 0; j < size; j++) {
            tile[i][j] = 0;
        }
    }
}

function draw() {

    background(31);
    for (var i = 0; i < tile.length; i++) {
        for (var j = 0; j < tile[0].length; j++) {

            updateColor(i, j);
            rect(30 * i + offset, 30 * j + offset, 30, 30);
            fill('#FFFFFF');
            text(abs(tile[i][j]), 30 * i + offset + 12, 30 * j + offset + 25);

        }
    }

    printShadow();
    fill(255);
    text(mapMouseX() + ", " + mapMouseY(), 20, 20);
}

function updateColor(i, j) {

    if      (tile[i][j] == 0) fill('#FFFFFF');
    else if (tile[i][j] > 0)  fill('#FF0000');
    else if (tile[i][j] < 0)  fill('#0000FF');

}

function mapMouseX() {

    var tileX = int(map(mouseX, offset, 30 * size + offset, 0, size));
    return tileX;//clamp(tileX, 0, 9);

}

function mapMouseY() {

    var tileY = int(map(mouseY, offset, 30 * size + offset, 0, size));
    return tileY;//clamp(tileY, 0, 9);

}

function clamp(value, min, max){

    if (value < min) value = min;
    else if (value > max) value = max;

    return value;

}

function mousePressed() {

    var tileX = mapMouseX();
    var tileY = mapMouseY();
    var increment = -3;

    if(turn) increment = 3;
    turn = !turn;

    if (tileX >= 0 && tileY >= 0 && tileX < size && tileY < size &&
        tile[tileX][tileY] == 0) {

        if     (orientation == 0){
            for (var i = tileX + 1; i < tile.length && i <= tileX + 5; i++)
                tile[i][tileY] += increment;
        }

        else if(orientation == 1){
            for (var j = tileY + 1; j < tile[0].length && j <= tileY + 5; j++)
                tile[tileX][j] += increment;
        }

        else if(orientation == 2){
            for (var i = tileX - 1; i >= 0 && i >= tileX - 5; i--)
                tile[i][tileY] += increment;

        }

        else if(orientation == 3){
            for (var j = tileY - 1; j >= 0 && j >= tileY - 5; j--)
                tile[tileX][j] += increment;
        }

    }
    orientation++;
    if(orientation > 3) orientation = 0;
}

function printShadow(){

    var tileX = mapMouseX();
    var tileY = mapMouseY();

    if (tileX >= 0 && tileY >= 0 && tileX < size && tileY < size) {

        fill(167, 49, 43, 120);
        rect(30 * tileX + offset, 30 * tileY + offset, 30, 30);
        fill(208, 108, 46, 120);

        if     (orientation == 0){
            for (var i = tileX + 1; i < tile.length && i <= tileX + 5; i++)
                rect(30 * i + offset, 30 * tileY + offset, 30, 30);
        }

        else if(orientation == 1){
            for (var j = tileY + 1; j < tile[0].length && j <= tileY + 5; j++)
                rect(30 * tileX + offset, 30 * j + offset, 30, 30);
        }

        else if(orientation == 2){
            for (var i = tileX - 1; i >= 0 && i >= tileX - 5; i--)
                rect(30 * i + offset, 30 * tileY + offset, 30, 30);

        }

        else if(orientation == 3){
            for (var j = tileY - 1; j >= 0 && j >= tileY - 5; j--)
                rect(30 * tileX + offset, 30 * j + offset, 30, 30);
        }

    }

}