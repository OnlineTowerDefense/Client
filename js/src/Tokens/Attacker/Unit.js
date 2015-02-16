Unit = function(config){
    this.____init(config);
};

Unit.prototype = {

    ____init:function(config){
        Konva.Image.call(this, config);
        this.className = 'Unit';
        this.speed = 0;
        this.rotationAngle = -1;
        this.setOffset({x:this.getWidth()/2,y:this.getHeight()/2});

        this.tween = null;

        this.on('MOVETO', function(event){

            Logger.info("Unit: Processing MOVETO Event for element with id = "+event.elementId);

            if(event.elementId !== this.getId()){
                Logger.error("Unit: Event of type MOVETO for element with id = "+event.elementId+" got relayed to the wrong Unit with id = "+this.getId());
                return false;
            }

            var duration = (event.endsAt - event.time)/1000;

            this.lookAt(event.endingCoordinate.y,event.endingCoordinate.x);

            this.tween = new Konva.Tween({
                node: this,
                duration: duration,
                x: event.endingCoordinate.x,
                y: event.endingCoordinate.y
            });

            this.tween.play();


        });


    },

    calculateAngleTo: function(targetId){
        var target = this.getStage().find('#'+targetId);
        if(!target){
            Logger.error("Unit: calculateAngleTo could not find target with id = "+targetId+" ... failing gracefull: return 0;");
            return 0;
        }
        var delta = {
            x: target.getX() - this.getX(),
            y: target.getY() - this.getY()
        };
        var angleTo = Math.atan2(delta.y,delta.x);
        return ~~Math.Util.radToDeg(angleTo);
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

        this.rotation(angle);

        this.rotationAngle = angle;
    },
    _update:function(data){

        if(this.currentEvent != null){
            Logger.error("Unit._update CALLED...WHY OH WHY????");

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
        Logger.error("Unit._getDistance CALLED...WHY OH WHY????");
        return Math.Util.distance(startingCoordinate.x,startingCoordinate.y,endingCoordinate.x,endingCoordinate.y);
    }
};

Konva.Util.extend(Unit, Konva.Image);