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
            image:Konva.Assets.RUNNER,
            width: 25,
            height: 25,
            unitWidth: 25,
            offset:{x:12,y:12},
            tokenType:'RUNNER'
        };
        Unit.call(this, baseConfig);
        this.className = 'Runner';
        this.speed = 50;
    }
};

Konva.Util.extend(Runner, Unit);