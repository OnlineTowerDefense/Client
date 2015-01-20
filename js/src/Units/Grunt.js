function Grunt(config){
    var baseConfig = {
        x:config.x,
        y:config.y,
        image:Kinetic.Assets.grunt,
        id:config.id
    };

    this.___init(baseConfig);
    this.on('MOVETO',function(data){
        console.log(data);
    });
}
Kinetic.Util.extend(Grunt, Kinetic.Image);