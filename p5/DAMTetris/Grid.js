/**
 * The tetris grid
 *
 * Basic properties
 * ----------------
 *
 * int gridWidth - The number of columns of the grid
 * int gridHeight - The number of rows of the grid
 * int visibleHeight - The number of rows the player can see
 * int[][] tiles - The grid with the piece id of each tile
 *
 */

function Grid(tileSprites, field){

    this.gridWidth = 10;
    this.gridHeight = 22;
    this.visibleHeight = 20;
    this.tiles = [];

    for(var i = 0; i < this.gridWidth; i++){
        this.tiles[i] = [];
        for(var j = 0; j < this.gridHeight; j++){
            this.tiles[i][j] = 0;
        }
    }

    /**
     * Draws the grid, it's sooooo cool
     */
    this.drawGrid = function(){

        image(field, 0, 0, 30 * 10, 30 * 20);


        for(var i = 0; i < this.gridWidth; i++){
            for(var j = this.gridHeight - this.visibleHeight; j < this.gridHeight; j++){

                var currentTile = this.tiles[i][j];

                if      (currentTile == 0){ }
                else if (currentTile >= -7 && currentTile <= 7) {
                    image(tileSprites[abs(currentTile) - 1], i * 30, (j - 2) * 30, 30, 30);
                }
                else{
                    image(tileSprites[abs(currentTile + 7)], i * 30, (j - 2) * 30, 30, 30);
                }


            }
        }

    }

    /**
     * Clears the moving piece tiles, setting it's value to 0, so it does only draw it where it moved to
     */
    this.clearCurrentPieceTiles = function(){ //TODO Use this for moving left/right/up instead of weird moving

        for(var i = 0; i < this.gridWidth; i++){
            for(var j = 0; j < this.gridHeight; j++){

                if(this.tiles[i][j] < 0) this.tiles[i][j] = 0;

            }
        }

    }

    /**
     * Moves all lines above a given row one place down
     *
     * @param row The bottom row where you want to start moving lines down.
     */
    this.moveLinesDown = function(row){

        for(var i = 0; i < this.gridWidth; i++) {
            for (var j = row; j > 0; j--) {

                this.tiles[i][j] = this.tiles[i][j - 1];

            }
        }

    }

}