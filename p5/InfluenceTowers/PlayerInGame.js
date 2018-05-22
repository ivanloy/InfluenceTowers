/* Player in a game, extends Player

Basic prop.
----------------
    int idInBoard : id that identifies the player in a board

 */

function PlayerInGame(player, idInBoard){

    this.playerID = player.id;
    this.playerNick = player.nick;
    this.idInBoard = idInBoard;

}