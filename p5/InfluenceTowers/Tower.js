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
String name  : The name of the tower
int hp       : The influence a tower can resist, if damage is equal or bigger, the tower will disable
int power    : The influence given to each tiles
int minRange : The minimun distance where the tower can spread influence
int maxRange : The maximun distance where the tower can spread influence
.TypeOfRange, powerDecreasing, walls, etc
.
.

 */

function Tower(id, towerData){

    this.id = id;
    this.damage = 0;
    this.player = new Player(0, "");
    this.dir = 0;

    this.name       = towerData.towers[id].name;
    this.hp         = towerData.towers[id].hp;
    this.power      = towerData.towers[id].power;
    this.minRange   = towerData.towers[id].minRange;
    this.maxRange   = towerData.towers[id].maxRange;
    this.rangeType  = towerData.towers[id].rangeType;

    print(this.id + ", " + this.damage + ", " + this.player + ", " + this.dir + ", " + this.name + ", " + this.hp + ", " + this.power + ", " + this.minRange + ", " + this.maxRange + ", " + this.rangeType);

}