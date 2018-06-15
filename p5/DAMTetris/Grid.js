/**
 * The tetris grid
 *
 */

function Grid(tileSprites){

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

                var currentTile = this.tiles[i][j];

                if      (currentTile == 0){ fill(31); rect(i*30, (j-2)*30, 30, 30);}
                else if (currentTile >= -7 && currentTile <= 7)
                    image(tileSprites[abs(currentTile) - 1], i * 30, (j - 2) * 30, 30, 30);

                else if (currentTile)  fill('#52fff3'); //TODO Add alpha, r, g, b, a colors, naisu traisu, or drawings
                else if (currentTile)  fill('#1a05c1');
                else if (currentTile)  fill('#ff8227');
                else if (currentTile)  fill('#fdff3d');
                else if (currentTile)  fill('#62ff3c');
                else if (currentTile)  fill('#FF0000');
                else if (currentTile)  fill('#940a89');


            }
        }

    }

    this.clearCurrentPieceTiles = function(){ //TODO Use this for moving left/right/up instead of weird moving

        for(var i = 0; i < this.gridWidth; i++){
            for(var j = 0; j < this.gridHeight; j++){

                if(this.tiles[i][j] < 0) this.tiles[i][j] = 0;

            }
        }

    }

    this.moveLinesDown = function(row){

        for(var i = 0; i < this.gridWidth; i++) {
            for (var j = row; j > 0; j--) {

                this.tiles[i][j] = this.tiles[i][j - 1];

            }
        }

    }

}