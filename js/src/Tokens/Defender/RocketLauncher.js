RocketLauncher = function(config){
    this._____init(config);
};
RocketLauncher.prototype = {
    _____init:function(config){
        var baseConfig = {
            x: config.x,
            y: config.y,
            id: config.id,
            name:'object',
            image:Konva.Assets.towerRocket,
            width: 100,
            height: 100,
            offset:{x:50,y:50},
            timeToReload: config.timeToReload,
            tokenType:'ROCKETLAUNCHER'
        };
        Tower.call(this, baseConfig);
        this.className = 'Rocket';

        this.left = false;


        this.on('tick',function(data){

            if(this.lastShot + this.timeToReload < data.time ){

                if(this.target === undefined || this.target == null){
                    return;
                }

                var angle = Math.Util.angle(this.x(), this.y(), this.target.x(), this.target.y());
                var gunAngle = angle;
                if(this.left){
                    gunAngle = angle - 20;
                    this.left = false;
                }else{
                    gunAngle = angle + 20;
                    this.left = true;
                }

                var distance = 55;
                var angleInRad = Math.Util.degToRad(gunAngle);
                var gunfireDetalX = Math.cos(angleInRad) * distance;
                var gunfireDetalY = Math.sin(angleInRad) * distance;


                var rocket = new Konva.Image({
                    x: this.getX()+gunfireDetalX,
                    y: this.getY()+gunfireDetalY,
                    image:Konva.Assets.bulletRocket,
                    offset:{x:10, y:0}
                });
                rocket.rotation(angle+90);

                this.getLayer().add(rocket);
                this.tween = new Konva.Tween({
                    node: rocket,
                    duration: 0.5,
                    easing: Konva.Easings.EaseIn,
                    x: this.target.getX(),
                    y: this.target.getY(),
                    onFinish: function() {
                        rocket.destroy();
                    }
                });

                this.tween.play();

                this.lastShot = data.time;
            }

        });



    }
};

Konva.Util.extend(RocketLauncher, Tower);