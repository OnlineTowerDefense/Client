Gattling = function(config){
    this._____init(config);
};
Gattling.prototype = {
    _____init:function(config){
        var baseConfig = {
            x: config.x,
            y: config.y,
            id: config.id,
            name:'object',
            image:Konva.Assets.towerGattling,
            width: 100,
            height: 100,
            offset:{x:50,y:50},
            timeToReload: config.timeToReload,
            tokenType:'GATTLING'
        };
        Tower.call(this, baseConfig);
        this.className = 'Flamer';


        this.left = false;
        this.on('tick',function(data){

            if(this.lastShot + this.timeToReload < data.time ){

                if(this.target === undefined || this.target == null || this.target.getParent() == undefined){
                    return;
                }

                var angle = Math.Util.angle(this.x(), this.y(), this.target.x(), this.target.y());
                var gunAngle = angle;
                if(this.left){
                    gunAngle = angle - 12;
                    this.left = false;
                }else{
                    gunAngle = angle + 12;
                    this.left = true;
                }

                var distance = 60;
                var angleInRad = Math.Util.degToRad(gunAngle);
                var gunfireDetalX = Math.cos(angleInRad) * distance;
                var gunfireDetalY = Math.sin(angleInRad) * distance;


                var bullet = new Konva.Image({
                    x: this.getX()+gunfireDetalX,
                    y: this.getY()+gunfireDetalY,
                    image:Konva.Assets.bulletBullet,
                    scale:{x:0.2,y:0.2},
                    offset:{x:60, y:13}
                });
                bullet.rotation(angle);

                this.getLayer().add(bullet);
                this.tween = new Konva.Tween({
                    node: bullet,
                    duration: 0.3,
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

Konva.Util.extend(Gattling, Tower);