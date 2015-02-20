var Direction = {

    SOUTH: 0,
    WEST: 1,
    NORTH: 2,
    EAST: 3,
    UNDEFINED:5,

    getDirection: function(fromX, fromY, toX, toY){

        var deltaX = toX - fromX;
        var deltaY = toY - fromY;

        if( Math.abs(deltaX) > Math.abs(deltaY )){
            // EAST_WEST
            if( deltaX > 0){
                return this.EAST;
            }else{
                return this.WEST;
            }
        }else{
            // NORTH_SOUTH
            if( deltaY > 0){
                return this.SOUTH;
            }else{
                return this.NORTH;
            }
        }
    }
}