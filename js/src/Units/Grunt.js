function Grunt(config) {
    var self = this;
    var baseConfig = {
        x: config.x,
        y: config.y,
        image: Kinetic.Assets.grunt,
        id: config.id,
        name:'object'
    };
    this.speed = 0;
    this.___init(baseConfig);

    function calculateSpeed(startingCoordinate,endingCoordinate,timeDiff){

        var distance = Math.Util.distance(startingCoordinate.x,startingCoordinate.y,endingCoordinate.x,endingCoordinate.y);
        self.speed = distance/timeDiff;
        console.log(self.speed );
    }
    this.on('MOVETO', function (data) {
        if(this.speed == 0){
            var diff = (data.endsAt - data.startsAt)/25;
            calculateSpeed(data.startingCoordinate,data.endingCoordinate,diff)
        }

    });

    this.on('update',function(){
        this.setY(this.getY()+this.speed);
    });

}
Kinetic.Util.extend(Grunt, Kinetic.Image);