/**
 * The current piece the player is moving
 */

function CurrentPiece(){

    this.piece = new Piece();
    this.grid = new Grid();
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.pieceType = '';
    this.lockDelay = 4;
    this.lockTicks = 0;

    this.setPiece = function(grid, pieceType, rotation, x, y){

        this.piece.setPiece(grid, pieceType, rotation, x, y);
        this.grid = grid;
        this.pieceType = pieceType;
        this.rotation = rotation;
        this.x = x;
        this.y = y;

    }

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

    this.hardDrop = function(){

        var ret = true;

        while(ret) {
            ret = this.piece.movePieceDown(this.grid, this.pieceType, this.rotation, this.x, this.y);
            if (ret) this.y++;
            else
                this.piece.lockPiece(this.grid, this.pieceType, this.rotation, this.x, this.y);
        }

    }

    this.deleteLines = function(){

        var blockCounter = 0;
        var numLines = 0;

        for(var i = 0; i < grid.gridHeight; i++){

            blockCounter = 0;
            for(var j = 0; j < grid.gridWidth; j++){

                if(grid.tiles[j][i] > 0) blockCounter++;

            }

            if(blockCounter >= 10){

                for(var j = 0; j < grid.gridWidth; j++)
                    grid.tiles[j][i] = 0;

                grid.moveLinesDown(i);
                numLines++;

            }

        }

        return numLines;

    }

    this.movePieceRight = function(){

        var ret = this.piece.movePieceRight(this.grid, this.pieceType, this.rotation, this.x, this.y);
        if(ret) this.x++;
        this.lockTicks = max(this.lockTicks - (this.lockDelay - this.lockTicks) / 2, this.lockDelay / 5);
        return ret;

    }

    this.movePieceLeft = function(){ //TODO ONE METHOD MA BOI

        var ret = this.piece.movePieceLeft(this.grid, this.pieceType, this.rotation, this.x, this.y);
        if(ret) this.x--;
        this.lockTicks = max(this.lockTicks - (this.lockDelay - this.lockTicks) / 2, this.lockDelay / 5);
        return ret;

    }

    this.rotatePieceClockwise = function(){

        var prevRotation = this.rotation;

        this.rotation++;
        if(this.rotation > 3) this.rotation = 0;
        if(!this.piece.check(grid, this.pieceType, this.rotation, this.x, this.y)) {

            this.rotation = prevRotation;

        }
        this.lockTicks = max(this.lockTicks - (this.lockDelay - this.lockTicks) / 2, this.lockDelay / 5);
        grid.clearCurrentPieceTiles();
        piece.setPiece(grid, this.pieceType, this.rotation, this.x, this.y);

    }

    this.rotatePieceAntiClockwise = function(){ //TODO Rotate in piece to check/wallkicks

        var prevRotation = this.rotation;

        this.rotation--;
        if(this.rotation < 0) this.rotation = 3;
        if(!this.piece.check(grid, this.pieceType, this.rotation, this.x, this.y)) //TODO Wallkicks
            this.rotation = prevRotation;
        this.lockTicks = max(this.lockTicks - (this.lockDelay - this.lockTicks) / 2, this.lockDelay / 5);
        grid.clearCurrentPieceTiles();
        piece.setPiece(grid, this.pieceType, this.rotation, this.x, this.y);

    }

}