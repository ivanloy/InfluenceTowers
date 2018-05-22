/*
A tile of the board.

Basic prop.
----------------
    int[] influence : An array with the influence of each player in the tile.
    Tower   tower   : The tower id in that tile. (0 if no tower)


 */

function Tile(){

    this.influence = [];
    this.tower = new Tower(0);

}