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

    }
};

Konva.Util.extend(Flamer, Tower);