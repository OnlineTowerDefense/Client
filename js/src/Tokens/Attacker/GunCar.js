GunCar = function(config){
    this._____init(config);
};
GunCar.prototype = {
    _____init:function(config){
        var baseConfig = {
            x: config.x,
            y: config.y,
            id: config.id,
            name:'object',
            image:Konva.Assets.GUNCAR,
            width: 66,
            height: 33,
            unitWidth: 33,
            offset:{x:33,y:17},
            tokenType:'GunCar'
        };
        Unit.call(this, baseConfig);
        this.className = 'GunCar';
        this.speed = 30;
    }
};

Konva.Util.extend(GunCar, Unit);