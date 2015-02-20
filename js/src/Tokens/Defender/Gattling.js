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

    }
};

Konva.Util.extend(Gattling, Tower);