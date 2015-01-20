function Grunt(config){
    var baseConfig = {
        x:config.x,
        y:config.y,
        image:Kinetic.Assets.grunt,
        id:config.id
    };

    this.___init(baseConfig);

}
Kinetic.Util.extend(Grunt, Kinetic.Image);