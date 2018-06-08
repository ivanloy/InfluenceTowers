/**
 * A tetris piece manager
 *
 * Basic attributes
 * ----------------
 * pieces : The arrays with the piece bounding boxes
 */
function Piece(){

    this.pieces = [

        [0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0], //I
        [1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0], //J
        [1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0], //L
        [0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0], //O
        [1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0], //S
        [1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0], //Z
        [0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0]  //T

    ];

    /**
     * Sets the tiles in the grid to be from x piece
     *
     * @param grid  The grid to use
     * @param pieceType The piece type id (0-I, 1-J, 2-L, 3-O, 4-S, 5-Z, 6-T)
     * @param rotation The rotation state of the piece (O is default, 1 clockwise, 2 is double rotation, 3 anticlockwise)
     * @param x The x pos of the boundbox
     * @param y The y pos of the boundbox
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
     * @param grid  The grid to use
     * @param pieceType The piece type id (0-I, 1-J, 2-L, 3-O, 4-S, 5-Z, 6-T)
     * @param rotation The rotation state of the piece (O is default, 1 clockwise, 2 is double rotation, 3 anticlockwise)
     * @param x The x pos of the boundbox
     * @param y The y pos of the boundbox
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
     * @param grid  The grid to use
     * @param pieceType The piece type id (0-I, 1-J, 2-L, 3-O, 4-S, 5-Z, 6-T)
     * @param rotation The rotation state of the piece (O is default, 1 clockwise, 2 is double rotation, 3 anticlockwise)
     * @param x The x pos of the boundbox
     * @param y The y pos of the boundbox
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
                        //print(x, y, i, j);
                }
            }
        }

        return ret;

    }

    /**
     * Moves a piece one position down in the grid
     *
     * @param grid  The grid to use
     * @param pieceType The piece type id (0-I, 1-J, 2-L, 3-O, 4-S, 5-Z, 6-T)
     * @param rotation The rotation state of the piece (O is default, 1 clockwise, 2 is double rotation, 3 anticlockwise)
     * @param x The x pos of the boundbox
     * @param y The y pos of the boundbox
     * @returns True if it fits, false if not, if it returns false the piece did not move.
     */
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

    /**
     * Moves a piece one position right in the grid
     *
     * @param grid  The grid to use
     * @param pieceType The piece type id (0-I, 1-J, 2-L, 3-O, 4-S, 5-Z, 6-T)
     * @param rotation The rotation state of the piece (O is default, 1 clockwise, 2 is double rotation, 3 anticlockwise)
     * @param x The x pos of the boundbox
     * @param y The y pos of the boundbox
     * @returns True if it fits, false if not, if it returns false the piece did not move.
     */
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

    /**
     *
     * Moves a piece one position left in the grid
     *
     * @param grid  The grid to use
     * @param pieceType The piece type id (0-I, 1-J, 2-L, 3-O, 4-S, 5-Z, 6-T)
     * @param rotation The rotation state of the piece (O is default, 1 clockwise, 2 is double rotation, 3 anticlockwise)
     * @param x The x pos of the boundbox
     * @param y The y pos of the boundbox
     * @returns True if it fits, false if not, if it returns false the piece did not move.
     */
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

    /**
     * Calculates the bounding box of a piece given its id and its rotation state
     *
     * @param pieceType The piece type id (0-I, 1-J, 2-L, 3-O, 4-S, 5-Z, 6-T)
     * @param rotation The rotation state of the piece (O is default, 1 clockwise, 2 is double rotation, 3 anticlockwise)
     * @returns {Array} A 2d array with the bounding box
     */
    this.getBoundingBox = function(pieceType, rotation){

        var boundingBoxSize = 4;
        if(pieceType === 1 || pieceType === 2 || pieceType > 3) //All pieces except I and O (4x4)
            boundingBoxSize = 3;

        var boundingBox = [];
        for(var i = 0; i < boundingBoxSize; i++) {
            boundingBox[i] = [];
            for (var j = 0; j < boundingBoxSize; j++) {
                //TODO change to use with 3x3l
                var index = 0;

                if     (rotation === 0) index = i * boundingBoxSize + j;
                else if(rotation === 1) index = (boundingBoxSize * boundingBoxSize - boundingBoxSize) + i - (j * boundingBoxSize);
                else if(rotation === 2) index = ((boundingBoxSize * boundingBoxSize) - 1) - (i * boundingBoxSize) - j;
                else                    index = boundingBoxSize * j + (boundingBoxSize - 1 - i);

                if(this.pieces[pieceType][index])
                  boundingBox[i][j] = 1;
                else
                  boundingBox[i][j] = 0;

            }
        }

        return boundingBox;

    }

}