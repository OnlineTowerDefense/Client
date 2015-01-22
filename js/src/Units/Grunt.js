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
        self.speed = distance/timeDiff;

    }

    this.on('MOVETO', function (data) {
        var targetId = 'unit_'+data.attackerId;
        if(this.getId() !== targetId){
            return false;
        }

        if(this.speed == 0){
            var diff = (data.endsAt - data.startsAt)/25;
            calculateSpeed(data.startingCoordinate,data.endingCoordinate,diff)
        }
        if(this.currentEvent == null){

            this.currentEvent = data;
            console.log('Added event',data);
        }

        var deltaX = ( data.endingCoordinate.x - this.getX() );
        var deltaY = (data.endingCoordinate.y - this.getY());

        //this.setX(deltaX);
        //this.setY(deltaY);

    });
    this.on('DO_MOVETO',function(data){
       console.log(this.getId()+ ' is Moving');

    });
    this.on('update',function(data){

        if(this.currentEvent != null){

            var time = ~~data.time;
            var complete = time >= this.currentEvent.endsAt;

            if(complete){
                console.log('finished event',this.currentEvent,time);

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