/**
 * The current piece the player is moving
 *
 * Basic properties
 * ----------------
 *
 * Piece piece    - The piece object
 * Grid  grid     - The grid where the piece is in
 * int x,y        - x and y coordinates of the upper left corner of the piece
 * int rotation   - The Rotation state of the piece (0 is default, 1 clockwise, 2 is double rotation, 3 anticlockwise)
 * char pieceType - The char identifying the piece given Tetris Guideline
 * int lockDelay  - The number of iterations before locking a piece on the grid
 * int lockTicks  - The current number of ticks of the lock delay, if it reaches lockDelay var value, the piece locks
 *
 */

function CurrentPiece(){

    this.piece = new Piece();
    this.grid = new Grid();
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.pieceType = '';
    this.lockDelay = 7; //TODO USE FRAMES ETC
    this.lockTicks = 0;

    /**
     * Sets a piece in a given position
     *
     * @param grid  The grid to use
     * @param pieceType The piece type id (0-I, 1-J, 2-L, 3-O, 4-S, 5-Z, 6-T)
     * @param rotation The rotation state of the piece (O is default, 1 clockwise, 2 is double rotation, 3 anticlockwise)
     * @param x The x pos of the boundbox
     * @param y The y pos of the boundbox
     */
    this.setPiece = function(grid, pieceType, rotation, x, y){

        this.piece.setPiece(grid, pieceType, rotation, x, y);
        this.grid = grid;
        this.pieceType = pieceType;
        this.rotation = rotation;
        this.x = x;
        this.y = y;

    }

    /**
     * Moves the current piece one place down
     *
     * @returns {boolean} True if it was possible to move it, false if not
     */
    this.movePieceDown = function() {

        var ret = this.piece.movePieceDown(this.grid, this.pieceType, this.rotation, this.x, this.y);
        if(ret) this.y++;
        else if(this.lockTicks >= this.lockDelay){
            this.lockTicks = 0;
            this.piece.lockPiece(this.grid, this.pieceType, this.rotation, this.x, this.y);
        }else {
            ret = true;
            if(keyIsDown(DOWN_ARROW))
                this.lockTicks += 0.25;
            else
                this.lockTicks++;
        }

        return ret;

    }

    /**
     * Hard drops the piece given Tetris Guideline
     */
    this.hardDrop = function(){

        var done = true;

        while(done) {
            done = this.piece.movePieceDown(this.grid, this.pieceType, this.rotation, this.x, this.y);
            if (done) this.y++;
            else
                this.piece.lockPiece(this.grid, this.pieceType, this.rotation, this.x, this.y);
        }

    }

    /**
     * Draws the ghost piece given tetris guideline
     */
    this.drawGhostPiece = function(){

        var done = true;
        var boundingBox = this.piece.getBoundingBox(this.pieceType, this.rotation);
        var ghostY = this.y;

        while(done) {

            done = this.piece.movePieceDown(this.grid, this.pieceType, this.rotation, this.x, ghostY + 1);
            if (done) ghostY++;
           /* else {

                for(var i = 0; i < boundingBox.length; i++) {
                    for (var j = 0; j < boundingBox[0].length; j++) {

                        if(boundingBox[j][i]) grid.tiles[i + this.x][j + this.y] = ((this.pieceType * -1) - 7); //-8, -9, -10...
                        //print(grid.tiles[i + this.x][j + this.y]);}
                    }
                }

            }*/

        }



    }

    /**
     * Deletes all cleared lines
     *
     * @returns {number} The number of lines deleted
     */
    this.deleteLines = function(){

        var blockCounter = 0;
        var numLines = 0;

        for(var i = 0; i < grid.gridHeight; i++){

            blockCounter = 0;
            for(var j = 0; j < grid.gridWidth; j++){

                if(grid.tiles[j][i] > 0) blockCounter++;

            }

            if(blockCounter >= grid.gridWidth){

                for(var j = 0; j < grid.gridWidth; j++)
                    grid.tiles[j][i] = 0;

                grid.moveLinesDown(i);
                numLines++;

            }

        }

        return numLines;

    }

    /**
     * Moves the current piece one place to the right
     *
     * @returns {boolean} True if it was possible to move it, false if not
     */
    this.movePieceRight = function(){

        grid.clearCurrentPieceTiles();
        var ret = this.piece.movePieceRight(this.grid, this.pieceType, this.rotation, this.x, this.y);
        if(ret) {
            this.x++;
            this.lockTicks = max(this.lockTicks - (this.lockDelay - this.lockTicks) / 2, this.lockDelay / 5);
        }


        this.drawGhostPiece();
        piece.setPiece(grid, this.pieceType, this.rotation, this.x, this.y);

        return ret;

    }

    /**
     * Moves the current piece one place to the left
     *
     * @returns {boolean} True if it was possible to move it, false if not
     */
    this.movePieceLeft = function(){ //TODO ONE METHOD MA BOI

        grid.clearCurrentPieceTiles();
        var ret = this.piece.movePieceLeft(this.grid, this.pieceType, this.rotation, this.x, this.y);
        if(ret) {
            this.x--;
            this.lockTicks = max(this.lockTicks - (this.lockDelay - this.lockTicks) / 2, this.lockDelay / 5);
        }

        this.drawGhostPiece();
        piece.setPiece(grid, this.pieceType, this.rotation, this.x, this.y);

        return ret;

    }

    /**
     * Rotates the current piece clockwise
     *
     * @returns {boolean} True if it was possible to rotate it, false if not
     */
    this.rotatePieceClockwise = function(){

        var prevRotation = this.rotation;

        this.rotation++;
        if(this.rotation > 3) this.rotation = 0;
        if(!this.piece.check(grid, this.pieceType, this.rotation, this.x, this.y)) {

            this.rotation = prevRotation;

        }

        this.lockTicks = max(this.lockTicks - (this.lockDelay - this.lockTicks) / 2, this.lockDelay / 5);
        grid.clearCurrentPieceTiles();

        this.drawGhostPiece();
        piece.setPiece(grid, this.pieceType, this.rotation, this.x, this.y);

    }

    /**
     * Rotates the current piece anti-clockwise
     *
     * @returns {boolean} True if it was possible to rotate it, false if not
     */
    this.rotatePieceAntiClockwise = function(){ //TODO Rotate in piece to check/wallkicks

        var prevRotation = this.rotation;

        this.rotation--;
        if(this.rotation < 0) this.rotation = 3;
        if(!this.piece.check(grid, this.pieceType, this.rotation, this.x, this.y)) //TODO Wallkicks
            this.rotation = prevRotation;
        this.lockTicks = max(this.lockTicks - (this.lockDelay - this.lockTicks) / 2, this.lockDelay / 5);
        grid.clearCurrentPieceTiles();

        this.drawGhostPiece();
        piece.setPiece(grid, this.pieceType, this.rotation, this.x, this.y);

    }

    this.drawNextPiece = function(next, tileSprites){

        fill(0);
        rect((grid.gridWidth + 2) * 30, 30, 120, 120);

         var boundingBox = this.piece.getBoundingBox(next, 0);
         for(var i = 0; i < boundingBox.length; i++) {
             for (var j = 0; j < boundingBox[0].length; j++) {

                 if(boundingBox[j][i])
                     image(tileSprites[next], (i + grid.gridWidth + 1) * 30 + 30, (j + 1) * 30, 30, 30);
             }
         }

    }

}