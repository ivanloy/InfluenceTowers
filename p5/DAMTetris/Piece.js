/**
 * A tetris piece manager
 */
function Piece(){

    //TODO Big array, each int an id
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

    this.O = [[0,0,0,0],
              [0,1,1,0], //TODO Put in file lol eksdi
              [0,1,1,0],
              [0,0,0,0]];

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
        else if (piece == 'O') boundingBox = this.O;

        for(var i = 0; i < boundingBox.length; i++) {
            for (var j = 0; j < boundingBox[0].length; j++) {

                if(boundingBox[j][i]) grid.tiles[i + x][j + y] = -1;

            }
        }
    }

    this.lockPiece = function (grid, piece, x, y) {

        var boundingBox = [];

        if      (piece == 'I') boundingBox = this.I;
        else if (piece == 'J') boundingBox = this.J;
        else if (piece == 'L') boundingBox = this.L;
        else if (piece == 'S') boundingBox = this.S;
        else if (piece == 'Z') boundingBox = this.Z; //TODO BB method
        else if (piece == 'T') boundingBox = this.T;
        else if (piece == 'O') boundingBox = this.O;

        for(var i = 0; i < boundingBox.length; i++) {
            for (var j = 0; j < boundingBox[0].length; j++) {

                if(boundingBox[j][i]) grid.tiles[i + x][j + y] = 1;

            }
        }

    }

    this.check = function(grid, piece, x, y){

        var boundingBox;
        var ret = true;

        if      (piece == 'I') boundingBox = this.I;
        else if (piece == 'J') boundingBox = this.J;
        else if (piece == 'L') boundingBox = this.L;
        else if (piece == 'S') boundingBox = this.S;
        else if (piece == 'Z') boundingBox = this.Z; //TODO BB method
        else if (piece == 'T') boundingBox = this.T;
        else if (piece == 'O') boundingBox = this.O;

        for(var i = 0; i < boundingBox.length && ret; i++) { //TODO doc
            for (var j = 0; j < boundingBox[0].length && ret; j++) {

                if(boundingBox[j][i] == 1 && ((j + y) >= grid.gridHeight || grid.tiles[i + x][j + y] > 0)) { //TODO Change j i
                    ret = false;
                    print(x, y, i, j);
                }
            }
        }

        return ret;

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
        else if (piece == 'O') boundingBox = this.O;

        if(this.check(grid, piece, x, y + 1)) {

            for (var i = 0; i < boundingBox.length && ret; i++) {
                for (var j = 0; j < boundingBox[0].length && ret; j++) {

                    if (boundingBox[j][i] > 0) {

                        grid.tiles[i + x][j + y] = 0;

                    }

                }
            }
            //TODO SAVE ME, THIS IS SO DUMB
            for (var i = 0; i < boundingBox.length && ret; i++) {
                for (var j = 0; j < boundingBox[0].length && ret; j++) {

                    if (boundingBox[j][i] > 0) {

                        grid.tiles[i + x][j + y + 1] = -1;

                    }

                }
            }

        }else {
            ret = false;
        }

        return ret;

    }

    this.movePieceRight = function(grid, piece, x, y){

        var boundingBox;
        var ret = true;

        if      (piece == 'I') boundingBox = this.I;
        else if (piece == 'J') boundingBox = this.J;
        else if (piece == 'L') boundingBox = this.L;
        else if (piece == 'S') boundingBox = this.S;
        else if (piece == 'Z') boundingBox = this.Z; //TODO BB method
        else if (piece == 'T') boundingBox = this.T;
        else if (piece == 'O') boundingBox = this.O;
        //TODO NOT BOUNDING BOX LOL XD; DIFFERENT COLORS PLZ
        if(x + boundingBox.length < grid.gridWidth && this.check(grid, piece, x + 1, y)) { //TODO CHECK IN DOWN TOO

            for (var i = 0; i < boundingBox.length && ret; i++) {
                for (var j = 0; j < boundingBox[0].length && ret; j++) {

                    if (boundingBox[j][i] > 0) {

                        grid.tiles[i + x][j + y] = 0;

                    }

                }
            } //TODO Generic method for down, left, right, up, etc
            //TODO SAVE ME, THIS IS SO DUMB
            for (var i = 0; i < boundingBox.length && ret; i++) {
                for (var j = 0; j < boundingBox[0].length && ret; j++) {

                    if (boundingBox[j][i] > 0) {

                        grid.tiles[i + x + 1][j + y] = -1;

                    }

                }
            }

        }else {
            ret = false;
        }

        return ret;

    }

    this.movePieceLeft = function(grid, piece, x, y){

        var boundingBox;
        var ret = true;

        if      (piece == 'I') boundingBox = this.I;
        else if (piece == 'J') boundingBox = this.J;
        else if (piece == 'L') boundingBox = this.L;
        else if (piece == 'S') boundingBox = this.S;
        else if (piece == 'Z') boundingBox = this.Z; //TODO BB method
        else if (piece == 'T') boundingBox = this.T;
        else if (piece == 'O') boundingBox = this.O;

        if(x > 0 && this.check(grid, piece, x - 1, y)) { //TODO CHECK IN DOWN TOO

            for (var i = 0; i < boundingBox.length && ret; i++) {
                for (var j = 0; j < boundingBox[0].length && ret; j++) {

                    if (boundingBox[j][i] > 0) {

                        grid.tiles[i + x][j + y] = 0;

                    }

                }
            } //TODO Generic method for down, left, right, up, etc
            //TODO SAVE ME, THIS IS SO DUMB
            for (var i = 0; i < boundingBox.length && ret; i++) {
                for (var j = 0; j < boundingBox[0].length && ret; j++) {

                    if (boundingBox[j][i] > 0) {

                        grid.tiles[i + x - 1][j + y] = -1;

                    }

                }
            }

        }else {
            ret = false;
        }

        return ret;

    }

}