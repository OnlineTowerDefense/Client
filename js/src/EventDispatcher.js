function EventDispatcher(){
    var self = this;
    this.stage = null;
    this.data = null;
    this.time = new Date();
    this.currentEvent = 0;
    function getEventData(time){
        for(var i = 0,il = self.data.length;i<il;i++){
            var event = self.data[i];
            if(time <= event.time){
                return event;
            }

        }

    }
    this.setStage = function(stage){
        this.stage = stage;
    };
    this.setData = function(data){
        this.data = data;
        console.log(data.length);
    };
    this.update = function(frame){
        if(!this.data && !this.stage){return false;}
        var currentEvent = getEventData(~~frame.time);
        if(currentEvent == undefined){
            return false;
        }
        this.stage.fire(currentEvent.type,currentEvent);
    }
}