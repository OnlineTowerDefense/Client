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
            width: 80,
            height: 80,
            offset:{x:40,y:40},
            baseOffset:{x:10,y:10}
        };
        Tower.call(this, baseConfig);
        this.className = 'Flamer';

    }
};

Konva.Util.extend(Flamer, Tower);