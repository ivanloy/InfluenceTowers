/*
A x * x tiles board

Basic prop.
----------------
    int      size  :  The number of rows and columns of the board
    Tile[][] tiles :  The 2d array of tiles of the board

 */

function Board(size){

    this.size = size;
    this.tiles = [];
    this.OFFSET = 50;

    for(var i = 0; i < size; i++){
        this.tiles[i] = [];
        for(var j = 0; j < size; j++){
            this.tiles[i][j] = new Tile();
        }
    }

    /**
     * Prints the board with the corresponding color of the player with the most influence, and a number with it's advantage
     */
    this.printBoard = function() {

        for (var i = 0; i < this.tiles.length; i++) {
            for (var j = 0; j < this.tiles[0].length; j++) {

                this.updateColor(this.tiles[i][j]);
                rect(30 * i + this.OFFSET, 30 * j + this.OFFSET, 30, 30);
                //fill('#FFFFFF');
                //text(abs(tiles[i][j]), 30 * i + OFFSET + 12, 30 * j + OFFSET + 25);

            }
        }

    }

    /**
     * Updates the printing color depending on who has the most influence on that tile
     *
     * @param tile (Tile) The Tile object to check
     */
    this.updateColor = function(tile) {

        const WHITE  =  color(255);
        const RED    =  color(255, 0, 0);
        const BLUE   =  color(0, 0, 255);
        const YELLOW =  color(255, 255, 0);
        const GREEN  =  color(0, 255, 0);

        var influence = []; //We copy the influence array to do the operations and keep the original clean
        for(var i = 0; i < tile.influence.length; i++)
            influence[i] = tile.influence[i];

        var position = [0, 0, 0, 0]; //Array with the position in influence of each player. Example: p1 : 10 inf., p2: 3 inf, p3 : 10 inf, p4 : 14 inf would be [2,3,2,1]
        var currentPosition = 0; //The position being calculated
        var lastPositionInfluence = 0; //The influence of the last position to see if it's a tie

        for(var i = 0; i < 4; i++){

            var max = 0;
            for(var j = 0; j < 4; j++)
                if(influence[j] > influence[max]) max = j;

            if(influence[max] == lastPositionInfluence) position[max] = currentPosition;
            else{
                currentPosition++;
                position[max] = currentPosition;
            }

            lastPositionInfluence = influence[max];
            influence[max] = 0;

        } //TODO MIX COLORS
        //print(lastPositionInfluence + ", " + position);
        if(position[0] == 0) fill(WHITE);
        else {
            for (var i = 0; i < 4; i++) {
                if (position[i] == 1) {

                    if     (i == 0) fill(RED);
                    else if(i == 1) fill(BLUE);
                    else if(i == 2) fill(GREEN);
                    else            fill(YELLOW);

                }
            }
        }
    }

    /**
     * Prints the tile info of the tile where the mouse is over.
     */
    this.printTileInfo = function(){

        var tileX = this.mapMouseX();
        var tileY = this.mapMouseY();

        if(tileX >= 0 && tileY >= 0 && tileY < this.size && tileX < this.size)
            this.tiles[tileX][tileY].printTileInfo(this.size * 30 + this.OFFSET + 20, 50);

    }

    /**
     * Maps and returns the position of the mouse to the column it's over
     * @returns {int} the tile column in the board
     */
    this.mapMouseX = function() {

        var tileX = int(map(mouseX, this.OFFSET, 30 * this.size + this.OFFSET, 0, this.size));
        return tileX;//clamp(tileX, 0, 9);

    }

    /**
     * Maps and returns the position of the mouse to the row it's over
     * @returns {int} the tile row in the board
     */
    this.mapMouseY = function() {

        var tileY = int(map(mouseY, this.OFFSET, 30 * this.size + this.OFFSET, 0, this.size));
        return tileY;//clamp(tileY, 0, 9);

    }

}