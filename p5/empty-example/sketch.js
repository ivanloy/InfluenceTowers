var tile = [];
var size;
var tile;
var offset;
function setup() {

    createCanvas(500, 500);
    size = 10;
    tile = [];
    offset = 50;

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
 
        }
    }

    text(mapMouseX() + ", " + mapMouseY(), 20, 20);
}

function updateColor(i, j) {

    if      (tile[i][j] == 0) fill('#FFFFFF');
    else if (tile[i][j] == 1) fill('#FF0000');
    else if (tile[i][j] == 2) fill('#0000FF'); 

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

    tileX = mapMouseX();
    tileY = mapMouseY();

    if (tileX >= 0 && tileY >= 0 && tileX < size && tileY < size) {

        tile[tileX][tileY]++;
        if (tile[tileX][tileY] > 2) tile[tileX][tileY] = 0;

    }

}