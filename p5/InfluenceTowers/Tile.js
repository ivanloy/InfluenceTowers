/*
A tile of the board.

Basic prop.
----------------
    int[] influence : An array with the influence of each player in the tile, max length 4.
    Tower   tower   : The tower id in that tile. (0 if no tower)

 */

function Tile(towerData){

    //this.influence = [int(random(0,25)), int(random(0,25)), int(random(0,25)), int(random(0,25))];
    this.influence = [0, 0, 0, 0];
    this.tower = new Tower(0, towerData);

    /**
     * Prints a rectangle with the tile info
     * @param posX (int)  The x position of the rectangle to print
     * @param posY (int)  The y position of the rectangle to print
     */
    this.printTileInfo = function(posX, posY){

        var colors = new Colors();
        fill(255);
        rect(posX, posY, 110, 90);

        fill(colors.RED);
        rect(posX + 5, posY + 15, 10, 10);
        fill(colors.BLUE);
        rect(posX + 5, posY + 30, 10, 10);
        fill(colors.GREEN);
        rect(posX + 5, posY + 45, 10, 10);
        fill(colors.ORANGE);
        rect(posX + 5, posY + 60, 10, 10);

        fill(0);
        text(" Player 1: " + this.influence[0] + " inf.\n" +
             " Player 2: " + this.influence[1] + " inf.\n" +
             " Player 3: " + this.influence[2] + " inf.\n" +
             " Player 4: " + this.influence[3] + " inf.\n",
            posX + 15, posY + 25);

    }

}