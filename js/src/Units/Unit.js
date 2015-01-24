Unit = function(config){
    this.____init(config);
};

Unit.prototype = {

    ____init:function(config){
        Kinetic.Image.call(this, config);
        this.className = 'Unit';
        this.speed = 0;

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


        });

        this.on('DO_MOVETO',function(data){
            this._doMoveTo(data);
        });

        this.on('update',function(data){
            this._update(data);
        });
    },
    _getDelta:function(y,x){
        var myX = this.getX();
        var myY = this.getY();
        return {
            x: x - myX,
            y: y - myY
        }
    },
    lookAt:function(y,x){
        this.rotate(0);
        var delta = this._getDelta(y,x);
        var angleTo = Math.atan2(delta.y,delta.x);
        this.setOffsetY(this.getHeight());
        this.rotate(Math.Util.radToDeg(angleTo));
    },
    _moveTo:function(data){

        var targetId = 'unit_'+data.attackerId;
        if(this.getId() !== targetId){
            return false;
        }

        if(this.speed == 0){
            var diff = (data.endsAt - data.startsAt)/1000;
            this._calculateSpeed(data.startingCoordinate,data.endingCoordinate,diff)
        }

        if(this.currentEvent == null){
            this.currentEvent = data;
            // this.setX(data.startingCoordinate.x);
            //this.setY(data.startingCoordinate.y);
            this.lookAt(data.endingCoordinate.y,data.endingCoordinate.x);
        }
    },
    _doMoveTo:function(data){

        var event = this.currentEvent;
        var x = this.getX();
        var y = this.getY();

        var delta = this._getDelta(event.endingCoordinate.y,event.endingCoordinate.x);
        if(delta.x !== 0){
            if(delta.x > 0){
                x+= this.speed;
            }else{
                x-= this.speed;
            }


        }
        if(delta.y !== 0){
            if(delta.y > 0){
                y+= this.speed;
            }else{
                y-= this.speed;
            }

        }

        this.setX(x);
        this.setY(y);
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
    },
    _calculateSpeed:function(startingCoordinate,endingCoordinate,timeDiff){
        var distance = this._getDistance(startingCoordinate,endingCoordinate);
        this.speed = (distance/timeDiff);

    }
};

Kinetic.Util.extend(Unit, Kinetic.Image);