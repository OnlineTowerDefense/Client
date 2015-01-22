Unit = function(config){
    this.____init(config);
};
Unit.prototype = {
    ____init:function(config){
        Kinetic.Image.call(this, config);
        this.className = 'Unit';
        this.speed = 0;

        this.on('MOVETO', function(data){

            this._moveTo(data)
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
        var delta = this._getDelta(y,x);
        var angleTo = Math.atan2(delta.y,delta.x);
        this.setOffsetY(this.getHeight());
        this.rotateDeg(Math.Util.radToDeg(angleTo));
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
            this.lookAt(data.endingCoordinate.y,data.endingCoordinate.x);
        }
    },
    _doMoveTo:function(data){

        var event = this.currentEvent;
        var x = this.getX();
        var y = this.getY();

        var delta = this._getDelta(event.endingCoordinate.y,event.endingCoordinate.x);
        if(delta.x !== 0){
            x+= this.speed;

        }
        if(delta.y !== 0){
            y+= this.speed;
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
    _calculateSpeed:function(startingCoordinate,endingCoordinate,timeDiff){
        var distance = Math.Util.distance(startingCoordinate.x,startingCoordinate.y,endingCoordinate.x,endingCoordinate.y);
        this.speed = (distance/timeDiff)/25;
    }
};

Kinetic.Util.extend(Unit, Kinetic.Image);