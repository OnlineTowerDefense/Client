Tower = function(config){
    this.____init(config);
};

Tower.prototype = {

    ____init:function(config) {

        Konva.Image.call(this, config);
        this.className = 'Tower';
        this.rotationAngle = -1;
        this.target = null;
        this.timeToReload = config.timeToReload;
        this.lastShot = 0;
        this.on('TOWER_NEW_TARGET', function (event) {

            Logger.info("Tower: Processing TOWER_NEW_TARGET Event for element with id = "+event.elementId);

            if(event.elementId !== this.getId()){
                Logger.error("Tower: Event of type TOWER_NEW_TARGET for element with id = "+event.elementId+" got relayed to the wrong Tower with id = "+this.getId());
                return false;
            }

            var targetObj = this.getStage().find('#'+event.attackerId);
            if (targetObj.length == 0){
                Logger.error("Tower: Could not find Target with id = "+event.attackerId);
            }
            this.target = targetObj[0];
        });

        this.on('TOWER_LOST_TARGET',function(data){
            this.target = null;
        });

        this.on('tick',function(data){
            if(this.target === undefined || this.target == null){
                return;
            }

            var delta = {
                x: this.target.getX() - this.getX(),
                y: this.target.getY() - this.getY()
            };
            var angleTo = Math.atan2(delta.y,delta.x);
            var angle = ~~Math.Util.radToDeg(angleTo);

            if(this.rotationAngle !== angle){
                this.rotation(angle);
                this.rotationAngle = angle;
            }

            if(this.lastShot + this.timeToReload < data.time ){

                var circle = new Konva.Circle({
                    x: this.getX(),
                    y: this.getY(),
                    radius: 2,
                    fill: 'red',
                    stroke: 'orange',
                    strokeWidth: 1
                });
                this.getLayer().add(circle);
                this.tween = new Konva.Tween({
                    node: circle,
                    duration: 0.2,
                    x: this.target.getX(),
                    y: this.target.getY(),
                    onFinish: function() {
                        circle.destroy();
                    }
                });

                this.tween.play();

                this.lastShot = data.time;
            }

        });
    }


};
Konva.Util.extend(Tower, Konva.Image);