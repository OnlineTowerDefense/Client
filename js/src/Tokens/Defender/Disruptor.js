Disruptor = function(config){
    this._____init(config);
};
Disruptor.prototype = {
    _____init:function(config){
        var baseConfig = {
            x: config.x,
            y: config.y,
            id: config.id,
            name:'object',
            image:Konva.Assets.towerDisruptor,
            width: 100,
            height: 100,
            offset:{x:50,y:50},
            timeToReload: config.timeToReload,
            tokenType:'DISRUPTOR'
        };
        Tower.call(this, baseConfig);
        this.className = 'Disruptor';

        this.on('TOWER_EFFECTS_TARGET',function(event){
            this.target = null;
            var targetObj = this.getStage().findOne('#'+event.attackerId);

            var angle = Math.Util.angle(this.x(), this.y(), targetObj.x(), targetObj.y());

            var distance = 60;
            var angleInRad = Math.Util.degToRad(angle);
            var gunfireDetalX = Math.cos(angleInRad) * distance;
            var gunfireDetalY = Math.sin(angleInRad) * distance;

            var warp = new Konva.Sprite({
                x: this.getX()+gunfireDetalX,
                y: this.getY()+gunfireDetalY,
                image:Konva.Assets.bulletWarp,
                offset:{x:13, y:88},
                animation:'shoot',
                scale:{x:0.6,y:0.6},
                animations:{
                    shoot:[
                        0,0,25,176,
                        25,0,25,176,
                        50,0,25,176,
                        75,0,25,176,
                        100,0,25,176,
                        125,0,25,176
                    ]
                },
                frameRate: 6,
                frameIndex: 0
            });
            warp.rotation(angle);
            this.getLayer().add(warp);
            var tween = new Konva.Tween({
                node: warp,
                duration: 1,
                x: targetObj.getX(),
                y: targetObj.getY(),
                onFinish: function() {
                    warp.destroy();
                }
            });
            warp.start();
            tween.play();

        });

        this.on('tick',function(data){

            var angle = (data.time / 10) % 360;

            this.rotation(angle);

        });



    }
};

Konva.Util.extend(Disruptor, Tower);