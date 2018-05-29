/*
A x * x tiles board

Basic prop.
----------------
    int           size  :  The number of rows and columns of the board
    Tile[][]     tiles  :  The 2d array of tiles of the board
    int      direction  :  The direction where the next tower will face (0 - Right, 1 - Down, 2 - Left, 3 - Up)
    int  towerSelected  :  The id of the tower currently selected
    int  currentPlayer  :  The idInBoard of the current player (Turn)
 */

function Board(size, towerData){

    this.size = size;
    this.tiles = [];
    this.direction = 0;
    this.towerSelected = 1;
    this.currentPlayer = 0;
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

        this.updateInfluence(); //TODO Update influence only when board changes
        for (var i = 0; i < this.tiles.length; i++) {
            for (var j = 0; j < this.tiles[0].length; j++) {

                this.updateColor(this.tiles[i][j]);
                rect(30 * i + this.OFFSET, 30 * j + this.OFFSET, 30, 30);
                fill('#FFFFFF'); //TODO Improve, tower info if cursor over tower, show hp, etc...
                if(this.tiles[i][j].tower.id == 0)
                    text(abs(this.calcInfAdvantage(this.tiles[i][j])), 30 * i + this.OFFSET + 12, 30 * j + this.OFFSET + 25);

            }
        }
        this.printRangeShadow(); //TODO printShadow() method and select this with rangeType() attribute

    }

    /**
     * Calculates the position array of a tile, Being 1 the player(s) with the most influence, 2 the second(s), etc..
     *
     * @param {Tile} tile, the tile to check
     * @returns {int[]} The position array
     */
    this.calcPositionArray = function(tile) {

        var position = [0, 0, 0, 0]; //Array with the position in influence of each player. Example: p1 : 10 inf., p2: 3 inf, p3 : 10 inf, p4 : 14 inf would be [2,3,2,1]
        var currentPosition = 0; //The position being calculated
        var lastPositionInfluence = 0; //The influence of the last position to see if it's a tie

        var influence = []; //We copy the influence array to do the operations and keep the original clean
        for(var i = 0; i < tile.influence.length; i++)
            influence[i] = tile.influence[i];

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

        }

        return position;

    }

    /**
     * Calcs the difference of influence between the first and second player, if tie, it return 0
     * @param tile The tile to check
     * @returns {number} The difference between the two players with the most influence on that tile
     */
    this.calcInfAdvantage = function(tile){

        var position = this.calcPositionArray(tile);
        var firstInf = 0;
        var secondInf = 0;
        var firstCount = 0;
        var ret = 0;

        if(position[0] != 0){

            for(var i = 0; i < position.length; i++){

                if     (position[i] == 1){
                    firstInf = tile.influence[i];
                    firstCount++;
                }
                else if(position[i] == 2) secondInf = tile.influence[i];

            }

        }

        if(firstCount == 1) ret = firstInf - secondInf;
        return ret;

    }

    /**
     * Updates the printing color depending on who has the most influence on that tile
     *
     * @param tile (Tile) The Tile object to check
     */
    this.updateColor = function(tile) {

        var position;
        var firstPlaceTaken = false; //To see if someone already took the first place and other player has the same influence (tie)
        var colors = new Colors();

        if(tile.tower.id == 0) {

            position = this.calcPositionArray(tile);
            //print(lastPositionInfluence + ", " + position);

            if (position[0] == 0) fill(colors.WHITE);
            else {
                for (var i = 0; i < 4; i++) {
                    if (position[i] == 1) {

                        if(firstPlaceTaken) fill(colors.BLACK);
                        else {
                            if (i == 0) fill(colors.RED);
                            else if (i == 1) fill(colors.BLUE);
                            else if (i == 2) fill(colors.GREEN);
                            else fill(colors.ORANGE);
                            firstPlaceTaken = true;
                        }

                    }
                }
            }

        }else fill(colors.GREY);

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
            for (var i = tileX + minRange; i < this.tiles.length && i <= tileX + maxRange && this.tiles[i][tileY].tower.id == 0; i++)
                this.tiles[i][tileY].influence[playerIndex] += increment;
        }

        else if(direction == 1){ //DOWN
            for (var j = tileY + minRange; j < this.tiles[0].length && j <= tileY + maxRange && this.tiles[tileX][j].tower.id == 0; j++)
                this.tiles[tileX][j].influence[playerIndex] += increment;
        }

        else if(direction == 2){ //LEFT
            for (var i = tileX - minRange; i >= 0 && i >= tileX - maxRange && this.tiles[i][tileY].tower.id == 0; i--) //TODO Healther
                this.tiles[i][tileY].influence[playerIndex] += increment;

        }

        else if(direction == 3){ //UP
            for (var j = tileY - minRange; j >= 0 && j >= tileY - maxRange && this.tiles[tileX][j].tower.id == 0; j--)
                this.tiles[tileX][j].influence[playerIndex] += increment;
        }

    }

    this.printRangeShadow = function() {

        var tileX = this.mapMouseX();
        var tileY = this.mapMouseY();
        var tower = new Tower(this.towerSelected, towerData);

        if(tileX >= 0 && tileY >= 0 && tileY < this.size && tileX < this.size
            && this.tiles[tileX][tileY].tower.id == 0 && this.checkIfNoInfluence(tileX, tileY)) {

            if (tower.rangeType == "h")
                 this.printRangeHShadow(tower);

        }
    }

    this.printRangeHShadow = function(tower){ //TODO Enum with colors

        const RED_ALPHA_INF   = color(154, 120);
        const RED_ALPHA_TOWER = color(44, 120);

        var direction = this.direction;
        var tileX = this.mapMouseX();
        var tileY = this.mapMouseY();
        var increment = tower.power;
        var minRange = tower.minRange;
        var maxRange = tower.maxRange;
        var playerIndex = tower.player.idInBoard;


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

            this.tiles[tileX][tileY].tower = new Tower(this.towerSelected, towerData); //TODO Gen 1, not read everytime, or something like that, who knows ma boi
            this.tiles[tileX][tileY].tower.direction = this.direction;
            this.tiles[tileX][tileY].tower.player.idInBoard = this.currentPlayer;
            this.nextTurn();
            print("TOWER ID " + this.towerSelected + " PLACED IN X:" + tileX + " Y:" + tileY + " DIRECTION: " + this.direction);

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

    /**
     * Changes the tower to the next id one, id 1 if passes the last one
     */
    this.changeToNextTower = function() {

        var numTowers = towerData.towers.length - 1;
        this.towerSelected++;

        if(this.towerSelected > numTowers) this.towerSelected = 1;

    }

    /**
     * Changes the tower to the prev id one, last tower if reaches the id 0 tower
     */
    this.changeToPrevTower = function() {

        var numTowers = towerData.towers.length - 1;
        this.towerSelected--;

        if(this.towerSelected <= 0) this.towerSelected = numTowers;

    }

    /**
     * Changes to the next player's turn
     */
    this.nextTurn = function () {

        this.currentPlayer++;

        if(this.currentPlayer > 3) this.currentPlayer = 0;

    }

}