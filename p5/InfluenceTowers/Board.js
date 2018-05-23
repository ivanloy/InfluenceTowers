/*
A x * x tiles board

Basic prop.
----------------
    int      size  :  The number of rows and columns of the board
    Tile[][] tiles :  The 2d array of tiles of the board
    int  direction  : The direction where the next tower will face (0 - Right, 1 - Down, 2 - Left, 3 - Up)

 */

function Board(size, towerData){

    this.size = size;
    this.tiles = [];
    this.direction = 0;
    this.OFFSET = 50; //TODO Set in doc

    for(var i = 0; i < size; i++){
        this.tiles[i] = [];
        for(var j = 0; j < size; j++){
            this.tiles[i][j] = new Tile(towerData); //TODO Find way to preload in Tower
        }
    }

    /**
     * Prints the board with the corresponding color of the player with the most influence, and a number with it's advantage
     */
    this.printBoard = function() {

        this.updateInfluence();
        for (var i = 0; i < this.tiles.length; i++) {
            for (var j = 0; j < this.tiles[0].length; j++) {

                this.updateColor(this.tiles[i][j]);
                rect(30 * i + this.OFFSET, 30 * j + this.OFFSET, 30, 30);
                //fill('#FFFFFF');
                //text(abs(tiles[i][j]), 30 * i + OFFSET + 12, 30 * j + OFFSET + 25);

            }
        }
        this.printRangeHShadow(); //TODO printShadow() method and select this with rangeType() attribute

    }

    /**
     * Updates the printing color depending on who has the most influence on that tile
     *
     * @param tile (Tile) The Tile object to check
     */
    this.updateColor = function(tile) {

        const WHITE  =  color(255); //TODO Enum with colors
        const RED    =  color(255, 0, 0);
        const BLUE   =  color(0, 0, 255);
        const YELLOW =  color(255, 255, 0);
        const GREEN  =  color(0, 255, 0);
        const BLACK  =  color(0, 0, 0);
        const GREY   =  color(133);

        var influence = []; //We copy the influence array to do the operations and keep the original clean
        for(var i = 0; i < tile.influence.length; i++)
            influence[i] = tile.influence[i];

        var position = [0, 0, 0, 0]; //Array with the position in influence of each player. Example: p1 : 10 inf., p2: 3 inf, p3 : 10 inf, p4 : 14 inf would be [2,3,2,1]
        var currentPosition = 0; //The position being calculated
        var lastPositionInfluence = 0; //The influence of the last position to see if it's a tie

        if(tile.tower.id == 0) {

            for (var i = 0; i < 4; i++) {

                var max = 0;
                for (var j = 0; j < 4; j++)
                    if (influence[j] > influence[max]) max = j;

                if (influence[max] == lastPositionInfluence) position[max] = currentPosition;
                else {
                    currentPosition++;
                    position[max] = currentPosition;
                }

                lastPositionInfluence = influence[max];
                influence[max] = -1;

            } //TODO BLACK IF TIE
            //print(lastPositionInfluence + ", " + position);
            if (position[0] == 0) fill(WHITE);
            else {
                for (var i = 0; i < 4; i++) {
                    if (position[i] == 1) {

                        if (i == 0) fill(RED);
                        else if (i == 1) fill(BLUE);
                        else if (i == 2) fill(GREEN);
                        else fill(YELLOW);

                    }
                }
            }

        }else fill(GREY);

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

    /**
     * Updates the influence of the tiles according to it's state (Towers, walls, etc...)
     */
    this.updateInfluence = function(){

        this.cleanTiles();
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                var tower = this.tiles[i][j].tower;
                if(tower.id != 0){

                    if(tower.rangeType == "h") this.updateRangeH(tower, i, j);

                }
            }
        }

    }

    /**
     * Updates influence for rangeType 'h'
     * @param tower (Tower) The tower spreading it's influence on the board
     */
    this.updateRangeH = function(tower, col, row){

        var direction = tower.direction;
        var tileX = col;
        var tileY = row;
        var increment = tower.power;
        var minRange = tower.minRange;
        var maxRange = tower.maxRange;
        var playerIndex = tower.player.idInBoard;

        if     (direction == 0){ //RIGHT
            for (var i = tileX + minRange; i < this.tiles.length && i <= tileX + maxRange; i++)
                this.tiles[i][tileY].influence[playerIndex] += increment;
        }

        else if(direction == 1){ //DOWN
            for (var j = tileY + minRange; j < this.tiles[0].length && j <= tileY + maxRange; j++)
                this.tiles[tileX][j].influence[playerIndex] += increment;
        }

        else if(direction == 2){ //LEFT
            for (var i = tileX - minRange; i >= 0 && i >= tileX - maxRange; i--)
                this.tiles[i][tileY].influence[playerIndex] += increment;

        }

        else if(direction == 3){ //UP
            for (var j = tileY - minRange; j >= 0 && j >= tileY - maxRange; j--)
                this.tiles[tileX][j].influence[playerIndex] += increment;
        }

    }

    this.printRangeHShadow = function(){ //TODO Enum with colors

        const RED_ALPHA_INF   = color(204, 0, 0, 120);
        const RED_ALPHA_TOWER = color(104, 120);

        var tower = new Tower(1, towerData); //TODO Delete this, pass some prebuilt objects
        //this.tiles[tileX][tileY].tower.direction = this.direction; //TODO useless if does not use the same object when placing the tower, could just take this.direction
        var direction = this.direction;
        var tileX = this.mapMouseX();
        var tileY = this.mapMouseY();
        var increment = tower.power;
        var minRange = tower.minRange;
        var maxRange = tower.maxRange;
        var playerIndex = tower.player.idInBoard;

        if(tileX >= 0 && tileY >= 0 && tileY < this.size && tileX < this.size && this.tiles[tileX][tileY].tower.id == 0 && this.checkIfNoInfluence(tileX, tileY)) {

            fill(RED_ALPHA_TOWER);
            rect(tileX * 30 + this.OFFSET, tileY * 30 + this.OFFSET, 30, 30);

            fill(RED_ALPHA_INF); //TODO Change color with the player putting the tower, cut the tower if crosses zones with more influence, lighter red if inf decreases over distance
            if (direction == 0) { //RIGHT
                for (var i = tileX + minRange; i < this.tiles.length && i <= tileX + maxRange; i++)
                    rect(i * 30 + this.OFFSET, tileY * 30 + this.OFFSET, 30, 30);
            }

            else if (direction == 1) { //DOWN
                for (var j = tileY + minRange; j < this.tiles[0].length && j <= tileY + maxRange; j++)
                    rect(tileX * 30 + this.OFFSET, j * 30 + this.OFFSET, 30, 30);
            }

            else if (direction == 2) { //LEFT
                for (var i = tileX - minRange; i >= 0 && i >= tileX - maxRange; i--)
                    rect(i * 30 + this.OFFSET, tileY * 30 + this.OFFSET, 30, 30);

            }

            else if (direction == 3) { //UP
                for (var j = tileY - minRange; j >= 0 && j >= tileY - maxRange; j--)
                    rect(tileX * 30 + this.OFFSET, j * 30 + this.OFFSET, 30, 30);
            }

        }
    }

    /**
     * Cleans all the tiles setting them to 0 influence
     */
    this.cleanTiles = function(){

        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                this.tiles[i][j].influence = [0, 0, 0, 0];
            }
        }

    }

    /**
     * Checks if there's no influence in a tile
     *
     * @param col (int) The column where the tile is on board
     * @param row (int) The row where the tile the tile is on board
     * @returns {boolean} True if it has no influence, false if it has
     */
    this.checkIfNoInfluence = function(col, row){

        var ret = true;
        var influence = this.tiles[col][row].influence;

        if     (influence[0] != 0) ret = false;
        else if(influence[1] != 0) ret = false;
        else if(influence[2] != 0) ret = false;
        else if(influence[3] != 0) ret = false;

        return ret;

    }

    /**
     * Places a tower where the cursor is over
     */
    this.placeTower = function(){ //TODO Change tower id, etc

        var tileX = this.mapMouseX();
        var tileY = this.mapMouseY();

        if(tileX >= 0 && tileY >= 0 && tileY < this.size && tileX < this.size && this.tiles[tileX][tileY].tower.id == 0 && this.checkIfNoInfluence(tileX, tileY)){ //CHECK NO INFLUENCE IN THAT TILE

            this.tiles[tileX][tileY].tower = new Tower(1, towerData); //TODO Gen 1, not read everytime, or something like that, who knows ma boi
            this.tiles[tileX][tileY].tower.direction = this.direction;
            print("TOWER ID " + 1 + " PLACED IN X:" + tileX + " Y:" + tileY + " DIRECTION: " + this.direction);

        }

        //TODO Change direction, print shadow

    }

    /**
     * Rotates the tower clockwise
     */
    this.rotateTowerClockwise = function() {

        this.direction++;
        if(this.direction > 3) this.direction = 0;

    }

    /**
     * Rotates the tower counterclockwise
     */
    this.rotateTowerCounterclockwise = function() {

        this.direction--;
        if(this.direction < 0) this.direction = 3;
        
    }



}