Flamer = function(config){
    this._____init(config);
};
Flamer.prototype = {
    _____init:function(config){
        var baseConfig = {
            x: config.x,
            y: config.y,
            id: config.id,
            name:'object',
            image:Konva.Assets.towerFlamer,
            width: 100,
            height: 100,
            offset:{x:50,y:50},
            timeToReload: config.timeToReload,
            tokenType:'PLASMA'
        };
        Tower.call(this, baseConfig);
        this.className = 'Flamer';



        this.on('tick',function(data){

            if(this.lastShot + this.timeToReload < data.time ){

                if(this.target === undefined || this.target == null){
                    return;
                }

                var angle = Math.Util.angle(this.x(), this.y(), this.target.x(), this.target.y());

                var distance = 60;
                var angleInRad = Math.Util.degToRad(angle);
                var gunfireDetalX = Math.cos(angleInRad) * distance;
                var gunfireDetalY = Math.sin(angleInRad) * distance;


                var bullet = new Konva.Image({
                    x: this.getX()+gunfireDetalX,
                    y: this.getY()+gunfireDetalY,
                    image:Konva.Assets.bulletFire,
                    scale:{x:0.4,y:0.4},
                    offset:{x:60, y:13}
                });
                bullet.rotation(angle);

                this.getLayer().add(bullet);
                this.tween = new Konva.Tween({
                    node: bullet,
                    duration: 0.5,
                    x: this.target.getX(),
                    y: this.target.getY(),
                    onFinish: function() {
                        bullet.destroy();
                    }
                });

                this.tween.play();

                this.lastShot = data.time;
            }

        });



    }
};

Konva.Util.extend(Flamer, Tower);