/*
A tower of the game, reads it's stats from a file given it's id

Basic prop.
----------------
int             id     : Unique for each type of tower
int             damage : The damage recieved by the tower, if it equals or exceeds, the tower will disable
Player          player : The player owning the tower, identified by it's it, id 0 player is NaP(Not a Player)
int             dir    : The direction where the tower is facing. (0 - Up, 1 - Right, 2 - Down, 3 - Left)

Prop got via file
--------------------
int hp       : The influence a tower can resist, if damage is equal or bigger, the tower will disable
int power    : The influence given to each tiles
int minRange : The minimun distance where the tower can spread influence
int maxRange : The maximun distance where the tower can spread influence
.TypeOfRange, powerDecreasing, walls, etc
.
.

 */

function Tower(id){

    this.id = id;
    this.damage = 0;
    this.player = new Player(0, "");
    this.dir = 0;

}