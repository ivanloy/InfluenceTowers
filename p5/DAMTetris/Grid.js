/**
 * The tetris grid
 *
 */

function Grid(){

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

    this.drawGrid = function(){

        for(var i = 0; i < this.gridWidth; i++){
            for(var j = 2; j < this.gridHeight; j++){

                if      (this.tiles[i][j] == 0) fill(31);
                else if (this.tiles[i][j] == 1 || this.tiles[i][j] == -1) fill('#FF0000');

                rect(i*30, (j-2)*30, 30, 30);

            }
        }

    }

}