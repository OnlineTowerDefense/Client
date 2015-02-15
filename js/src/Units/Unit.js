Unit = function(config){
    this.____init(config);
};

Unit.prototype = {

    ____init:function(config){
        Konva.Image.call(this, config);
        this.className = 'Unit';
        this.speed = 0;
        this.rotationAngle = -1;
        this.rotate(0);
        this.on('MOVETO', function(data){

            var unitName = 'unit_' + data.attackerId;
            if(unitName !== this.getId()){
                return false;
            }
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
            this.lookAt(data.startingCoordinate.y,data.startingCoordinate.x);

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

        var delta = this._getDelta(y,x);
        var angleTo = Math.atan2(delta.y,delta.x);
        var angle = ~~Math.Util.radToDeg(angleTo);

        if(this.rotationAngle == angle){
            return false;
        }

        this.setRotation(angle);

        this.rotationAngle = angle;
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

Konva.Util.extend(Unit, Konva.Image);