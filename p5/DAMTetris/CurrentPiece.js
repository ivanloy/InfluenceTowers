/**
 * The current piece the player is moving
 */

function CurrentPiece(){

    this.piece = new Piece();
    this.grid = new Grid();
    this.x = 0;
    this.y = 0;
    this.pieceType = '';

    this.setPiece = function(grid, piece, x, y){

        this.piece.setPiece(grid, piece, x, y);
        this.grid = grid;
        this.pieceType = piece;
        this.x = x;
        this.y = y;

    }

    this.movePieceDown = function() {

        var ret = this.piece.movePieceDown(this.grid, this.pieceType, this.x, this.y);
        if(ret) this.y++;
        else this.piece.lockPiece(this.grid, this.pieceType, this.x, this.y);
        return ret;

    }

    this.movePieceRight = function(){

        var ret = this.piece.movePieceRight(this.grid, this.pieceType, this.x, this.y);
        if(ret) this.x++;
        return ret;

    }

    this.movePieceLeft = function(){ //TODO ONE METHOD MA BOI

        var ret = this.piece.movePieceLeft(this.grid, this.pieceType, this.x, this.y);
        if(ret) this.x--;
        return ret;

    }

}