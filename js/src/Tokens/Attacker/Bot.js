Bot = function(config){
    this._____init(config);
};
Bot.prototype = {
    _____init:function(config){
        var baseConfig = {
            x: config.x,
            y: config.y,
            id: config.id,
            name:'object',
            image:Konva.Assets.BOT,
            width: 34,
            height: 44,
            unitWidth: 44,
            offset:{x:17,y:22},
            tokenType:'BOT'
        };
        Unit.call(this, baseConfig);
        this.className = 'Bot';
        this.speed = 30;
    }
};

Konva.Util.extend(Bot, Unit);