function EventDispatcher() {
    var self = this;
    this.stage = null;
    this.data = null;
    this.finished = false;
    this.events = {};

    function getEventData(time) {
        var foundEvents = [];
        for (var i = 0, il = self.data.length; i < il; i++) {
            var currentEvent = self.data[i];
            var eventTime = currentEvent.time;
            if(eventTime === undefined){
                eventTime = currentEvent.startsAt;
            }
            if(time >= eventTime){
                foundEvents.push(currentEvent);
            }

        }
        return foundEvents;
    }

    this.setStage = function (stage) {
        this.stage = stage;

    };
    this.setData = function (data) {
        this.data = data;

        for (var i = 0, il = data.length; i < il; i++) {
            var currentEvent = data[i];
            var currentTime = currentEvent.time;
            if (currentTime == undefined) {
                currentTime = currentEvent.startsAt;
            }
            if (this.events[currentTime] == undefined) {
                this.events[currentTime] = [];
            }
            this.events[currentTime].push(currentEvent);
        }

    };
    this.trigger = function (time) {
        var passedEvents = getEventData(time);
        if(console){
            console.log("%c EventDispater.time = "+time, "color:green;font-weight:bold;");
        }
        for(var i = 0,il = passedEvents.length;i<il;i++){
            var currentEvent = passedEvents[i];
            currentEvent.currentTime = time;
            this.stage.find('.object').each(function (obj) {
                obj.fire(currentEvent.type, currentEvent, true);
            });
            this.stage.fire(currentEvent.type, currentEvent);
        }

    };
    this.update = function (frame) {
        if (this.events.length == 0 && !this.stage) {
            return false;
        }
        var currentEvents = getEventData(~~frame.time);


        for (var i = 0, il = currentEvents.length; i < il; i++) {
            var currentEvent = currentEvents[i];
            this.stage.find('.object').each(function (obj) {
                obj.fire(currentEvent.type, currentEvent, true);
            });
            this.stage.fire(currentEvent.type, currentEvent);

        }

    }
}