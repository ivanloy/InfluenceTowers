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
                else if (this.tiles[i][j] == 1 || this.tiles[i][j] == -1) fill('#52fff3');
                else if (this.tiles[i][j] == 2 || this.tiles[i][j] == -2) fill('#1a05c1');
                else if (this.tiles[i][j] == 3 || this.tiles[i][j] == -3) fill('#ff8227');
                else if (this.tiles[i][j] == 4 || this.tiles[i][j] == -4) fill('#fdff3d');
                else if (this.tiles[i][j] == 5 || this.tiles[i][j] == -5) fill('#62ff3c');
                else if (this.tiles[i][j] == 6 || this.tiles[i][j] == -6) fill('#FF0000');
                else if (this.tiles[i][j] == 7 || this.tiles[i][j] == -7) fill('#940a89');
                else if (this.tiles[i][j] == -8)  fill('#52fff3'); //TODO Add alpha, r, g, b, a colors, naisu traisu, or drawings
                else if (this.tiles[i][j] == -9)  fill('#1a05c1');
                else if (this.tiles[i][j] == -10) fill('#ff8227');
                else if (this.tiles[i][j] == -11) fill('#fdff3d');
                else if (this.tiles[i][j] == -12) fill('#62ff3c');
                else if (this.tiles[i][j] == -13) fill('#FF0000');
                else if (this.tiles[i][j] == -14) fill('#940a89');

                rect(i*30, (j-2)*30, 30, 30);

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