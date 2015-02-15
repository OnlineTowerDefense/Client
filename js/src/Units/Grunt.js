Grunt = function(config){
    this._____init(config);
};
Grunt.prototype = {
    _____init:function(config){
        var baseConfig = {
            x: config.x,
            y: config.y,
            id: config.id,
            name:'object',
            image:Konva.Assets.grunt
        };
        Unit.call(this, baseConfig);
        this.className = 'Grunt';
        this.speed = 30;
    }
};

Konva.Util.extend(Grunt, Unit);