Runner = function(config){
    this._____init(config);
};
Runner.prototype = {
    _____init:function(config){
        var baseConfig = {
            x: config.x,
            y: config.y,
            id: config.id,
            name:'object',
            image:Konva.Assets.runner,
            width: 40,
            height: 40,
            offset:{x:20,y:20}
        };
        Unit.call(this, baseConfig);
        this.className = 'Runner';
        this.speed = 50;
    }
};

Konva.Util.extend(Runner, Unit);