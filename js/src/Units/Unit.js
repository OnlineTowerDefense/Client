Unit = function(config){
    this.____init(config);
};

Unit.prototype = {

    ____init:function(config){
        Kinetic.Image.call(this, config);
        this.className = 'Unit';
        this.speed = 0;
        this.rotationAngle = 0;
        this.rotate(0);
        this.on('MOVETO', function(data){


            if(data.currentTime >= data.endsAt){
                return false;
            }
            var timeDelta = data.currentTime - data.startsAt;
            var speedPerSecond = this.speed/1000;
            var deltaX = data.endingCoordinate.x - data.startingCoordinate.x;
            var deltaY = data.endingCoordinate.y - data.startingCoordinate.y;

            var currentY = 0;
            var currentX = 0;

            if(deltaX !== 0){
                currentX = data.startingCoordinate.x;
                if(deltaX > 0){
                    currentX+=(speedPerSecond * timeDelta);
                }else{
                    currentX-=(speedPerSecond * timeDelta);
                }
                this.setX(currentX);
            }
            if(deltaY !== 0){
                currentY = data.startingCoordinate.y;
                if(deltaY > 0){
                    currentY+=(speedPerSecond * timeDelta);
                }else{
                    currentY-=(speedPerSecond * timeDelta);
                }
                this.setY(currentY);
            }

            var angleTo = Math.atan2(deltaY,deltaX);
            var angle = Math.Util.radToDeg(angleTo);
            if(angle !== this.rotationAngle){
                //this.rotateDeg(0);
                //this.rotateDeg(angle);

                this.rotationAngle = angle;
            }

        });


    },

    _getDelta:function(y,x){
        var myX = this.getX();
        var myY = this.getY();
        return {
            x: myX -x ,
            y: myY -y
        }
    },
    lookAt:function(y,x){
        //this.rotate(0);
        var delta = this._getDelta(y,x);
        var angleTo = Math.atan2(delta.y,delta.x);
       // this.setOffsetY(this.getHeight());
        console.log(angleTo);
        this.rotate(Math.Util.radToDeg(angleTo));
    },
    _update:function(data){

        if(this.currentEvent != null){
            var time = ~~data.time;
            var complete = time >= this.currentEvent.endsAt;

            if(complete){
                this.currentEvent = null;
                return false;
            }
            if(this.currentEvent != null){
                this.fire('DO_'+this.currentEvent.type,data,true);
            }
        }
    },
    _getDistance:function(startingCoordinate,endingCoordinate){
        return Math.Util.distance(startingCoordinate.x,startingCoordinate.y,endingCoordinate.x,endingCoordinate.y);
    }
};

Kinetic.Util.extend(Unit, Kinetic.Image);