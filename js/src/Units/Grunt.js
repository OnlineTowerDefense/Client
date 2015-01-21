function Grunt(config) {
    var baseConfig = {
        x: config.x,
        y: config.y,
        image: Kinetic.Assets.grunt,
        id: config.id,
        name:'object'
    };

    this.___init(baseConfig);

    this.on('MOVETO', function (data) {
       var x = this.getX();
        console.log(x);
        x+=10;
        this.setX(x);
    });


}
Kinetic.Util.extend(Grunt, Kinetic.Image);