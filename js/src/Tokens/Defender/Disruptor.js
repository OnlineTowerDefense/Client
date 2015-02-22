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
            tokenType:'GATTLING'
        };
        Tower.call(this, baseConfig);
        this.className = 'Disruptor';


        this.on('tick',function(data){

            var angle = (data.time / 10) % 360;

            this.rotation(angle);

        });



    }
};

Konva.Util.extend(Disruptor, Tower);