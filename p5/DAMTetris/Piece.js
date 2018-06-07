/**
 * A tetris piece manager
 */
function Piece(){

    this.pieces = [

        [0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0], //I
        [0,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0], //J
        [0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0], //L
        [0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0], //O
        [0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0], //S
        [0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0], //Z
        [0,0,1,0,0,1,1,1,0,0,0,0,0,0,0,0]  //T

    ];

    /**
     * Sets the tiles in the grid to be from x piece
     *
     * @param grid   The grid to use
     * @param pieceType  The piece type char (I, T, Z...) //TODO Change doc
     * @param x      The x pos of the boundbox
     * @param y      The y pos of the boundbox
     */
    this.setPiece = function(grid, pieceType, rotation, x, y) { //TODO ret false if illegal

        var boundingBox = this.getBoundingBox(pieceType, rotation);
        for(var i = 0; i < boundingBox.length; i++) {
            for (var j = 0; j < boundingBox[0].length; j++) {

                if(boundingBox[j][i]) grid.tiles[i + x][j + y] = -(pieceType + 1); //TODO change j, i, confusing

            }
        }

    }

    /**
     * Locks a piece in the grid
     *
     * @param grid The grid, obviously
     * @param pieceType The piece type char (I, T, Z...)
     * @param x The column in the grid (Upper-left corner)
     * @param y The row in the grid (Upper-left corner)
     */
    this.lockPiece = function (grid, pieceType, rotation, x, y) {

        var boundingBox = this.getBoundingBox(pieceType, rotation);

        for(var i = 0; i < boundingBox.length; i++) {
            for (var j = 0; j < boundingBox[0].length; j++) {

                if(boundingBox[j][i]) grid.tiles[i + x][j + y] = pieceType + 1;

            }
        }

    }

    /**
     *
     * Checks if a piece fits in a position in the grid
     *
     * @param grid The grid, obviously
     * @param pieceType The piece type char (I, T, Z...)
     * @param x The column in the grid (Upper-left corner)
     * @param y The row in the grid (Upper-left corner)
     * @returns {boolean} True if it fits, false if not
     */
    this.check = function(grid, pieceType, rotation, x, y){

        var boundingBox = this.getBoundingBox(pieceType, rotation);
        var ret = true;

        for(var i = 0; i < boundingBox.length && ret; i++) { //TODO doc
            for (var j = 0; j < boundingBox[0].length && ret; j++) {

                if(((x + i < 0 || x + i >= grid.gridWidth || y + j < 0 || y + j >= grid.gridHeight) && boundingBox[j][i] === 1) ||
                    (boundingBox[j][i] === 1 &&
                        ((j + y) >= grid.gridHeight
                            || grid.tiles[i + x][j + y] > 0))) { //TODO Change j i
                        ret = false;
                        print(x, y, i, j);
                }
            }
        }

        return ret;

    }

    this.movePieceDown = function(grid, pieceType, rotation, x, y){

        var boundingBox = this.getBoundingBox(pieceType, rotation);
        var ret = true;

        if(this.check(grid, pieceType, rotation, x, y + 1)) {

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

                        grid.tiles[i + x][j + y + 1] = -(pieceType + 1);

                    }

                }
            }

        }else {
            ret = false;
        }

        return ret;

    }

    this.movePieceRight = function(grid, pieceType, rotation, x, y){

        var boundingBox = this.getBoundingBox(pieceType, rotation);
        var ret = true;

        //TODO NOT BOUNDING BOX LOL XD; DIFFERENT COLORS PLZ
        if(this.check(grid, pieceType, rotation, x + 1, y)) { //TODO CHECK IN DOWN TOO

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

                        grid.tiles[i + x + 1][j + y] = -(pieceType + 1);

                    }

                }
            }

        }else {
            ret = false;
        }

        return ret;

    }

    this.movePieceLeft = function(grid, pieceType, rotation, x, y){

        var boundingBox = this.getBoundingBox(pieceType, rotation);
        var ret = true;

        if(this.check(grid, pieceType, rotation, x - 1, y)) { //TODO CHECK IN DOWN TOO

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

                        grid.tiles[i + x - 1][j + y] = -(pieceType + 1);

                    }

                }
            }

        }else {
            ret = false;
        }

        return ret;

    }

    this.getBoundingBox = function(pieceType, rotation){

        var boundingBox = [];
        for(var i = 0; i < 4; i++) {
            boundingBox[i] = [];
            for (var j = 0; j < 4; j++) {

                var index = 0;

                if     (rotation === 0) index = i * 4 + j;
                else if(rotation === 1) index = 12 + i - (j * 4);
                else if(rotation === 2) index = 15 - (i * 4) - j;
                else                    index = 4 * j + (3 - i);

                if(this.pieces[pieceType][index])
                  boundingBox[i][j] = 1;
                else
                  boundingBox[i][j] = 0;

            }
        }

        return boundingBox;

    }

}