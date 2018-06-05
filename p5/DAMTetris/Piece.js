/**
 * A tetris piece manager
 */
function Piece(){

    this.I = [[0,0,0,0],
               [1,1,1,1],
               [0,0,0,0],
               [0,0,0,0]];

    this.J = [[1,0,0],
               [1,1,1],
               [0,0,0]];

    this.L = [[0,0,1], //TODO Put in file lol eksdi
               [1,1,1],
               [0,0,0]];

    this.O = [[1,0,0],
               [1,1,1],
               [0,0,0]];

    this.S = [[0,1,1],
               [1,1,0],
               [0,0,0]];

    this.Z = [[1,1,0],
               [0,1,1],
               [0,0,0]];

    this.T = [[0,1,0],
               [1,1,1],
               [0,0,0]];


    /**
     * Sets the tiles in the grid to be from x piece
     *
     * @param grid   The grid to use
     * @param piece  The piece char (I, T, Z...)
     * @param x      The x pos of the boundbox
     * @param y      The y pos of the boundbox
     */
    this.setPiece = function(grid, piece, x, y) { //TODO ret false if illegal

        var boundingBox = [];

        if      (piece == 'I') boundingBox = this.I;
        else if (piece == 'J') boundingBox = this.J;
        else if (piece == 'L') boundingBox = this.L;
        else if (piece == 'S') boundingBox = this.S;
        else if (piece == 'Z') boundingBox = this.Z; //TODO BB method
        else if (piece == 'T') boundingBox = this.T;

        for(var i = 0; i < boundingBox.length; i++) {
            for (var j = 0; j < boundingBox[0].length; j++) {

                if(boundingBox[j][i]) grid.tiles[i + x][j + y] = 1;

            }
        }
    }

    this.movePieceDown = function(grid, piece, x, y){

        var boundingBox;
        var ret = true;

        if      (piece == 'I') boundingBox = this.I;
        else if (piece == 'J') boundingBox = this.J;
        else if (piece == 'L') boundingBox = this.L;
        else if (piece == 'S') boundingBox = this.S;
        else if (piece == 'Z') boundingBox = this.Z; //TODO BB method
        else if (piece == 'T') boundingBox = this.T;

        for(var i = 0; i < boundingBox.length; i++) {
            for (var j = 0; j < boundingBox[0].length; j++) {

                if(boundingBox[j][i]){

                    if(y > 0 && grid.tiles[i + x][j + y + 1] == 0) {
                        grid.tiles[i + x][j + y] = 0;
                        grid.tiles[i + x][j + y + 1] = 1;
                    }
                    else ret = false;

                }

            }
        }

        return ret;

    }

}