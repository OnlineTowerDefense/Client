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
            image:Kinetic.Assets.runner
        };
        Unit.call(this, baseConfig);
        this.className = 'Runner';
    }
};

Kinetic.Util.extend(Runner, Unit);