function EventDispatcher(){
    var self = this;
    this.stage = null;
    this.data = null;
    this.finished = false;
    this.events = {};

    function getEventData(time){
        for(var eventTime in self.events){
            var events = self.events[eventTime];
            if(time <= eventTime){
                return events;
            }
        }
        return false;
    }
    this.setStage = function(stage){
        this.stage = stage;

    };
    this.setData = function(data){

        for(var i = 0,il = data.length;i<il;i++){
            var currentEvent = data[i];
            var currentTime = currentEvent.time;
            if(currentTime == undefined){
                currentTime = currentEvent.startsAt;
            }
            if(this.events[currentTime] == undefined){
                this.events[currentTime] = [];
            }
            this.events[currentTime].push(currentEvent);
        }

    };
    this.update = function(frame){
        if(!this.events && !this.stage){return false;}
        var currentEvents = getEventData(~~frame.time);
        if(currentEvents == false){
            this.finished = true;
            return false;
        }

        for(var i= 0,il=currentEvents.length;i<il;i++){
            var currentEvent = currentEvents[i];
            this.stage.find('.object').each(function(obj){
                obj.fire(currentEvent.type,currentEvent,true);
            });
            this.stage.fire(currentEvent.type,currentEvent);

        }

    }
}