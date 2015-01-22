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
    this.currentEvent = null;
    this.___init(baseConfig);

    function calculateSpeed(startingCoordinate,endingCoordinate,timeDiff){

        var distance = Math.Util.distance(startingCoordinate.x,startingCoordinate.y,endingCoordinate.x,endingCoordinate.y);
        self.speed = (distance/timeDiff)/25;

    }

    this.on('MOVETO', function (data) {
        var targetId = 'unit_'+data.attackerId;
        if(this.getId() !== targetId){
            return false;
        }

        if(this.speed == 0){
            var diff = (data.endsAt - data.startsAt)/1000;
            calculateSpeed(data.startingCoordinate,data.endingCoordinate,diff)
        }
        if(this.currentEvent == null){
            this.currentEvent = data;
        }


    });
    this.on('DO_MOVETO',function(data){

        var event = this.currentEvent;
        var x = this.getX();
        var y = this.getY();
        var deltaX = (event.endingCoordinate.x - x);
        var deltaY = (event.endingCoordinate.y - y);
        if(deltaX !== 0){
            this.setX(x+=this.speed);
        }
        if(deltaY !== 0){
            this.setY(y+=this.speed);
        }
    });
    this.on('update',function(data){

        if(this.currentEvent != null){

            var time = ~~data.time;
            var complete = time >= this.currentEvent.endsAt;

            if(complete){
                this.currentEvent = null;
                return false;
            }

            if(this.currentEvent != null){
                this.fire('DO_'+this.currentEvent.type,data,true);
            }
        }

    });

}
Kinetic.Util.extend(Grunt, Kinetic.Image);