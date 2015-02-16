/**
 *  The EventQueue is ordered by Time.
 *  You can pop events from it untill a certain time.
 *
 */
function EventQueue() {
    var events = {};
    var lastPop = -1;

    this.isEmpty = function(){
        return events.length > 0 && events[events.length-1].time <= lastPop;
    };

    this.popEvents = function(toTime) {
        var currentMilliseconds = Math.floor( toTime );
        var foundEvents = [];

        for (var i = lastPop+1; i<=currentMilliseconds; i++) {
            var eventsForTime = events[i];
            if (eventsForTime) {
                for (var k = 0; k < eventsForTime.length; k++) {
                    foundEvents.push(eventsForTime[k]);
                }
            }
        }
        lastPop = currentMilliseconds;
        if(foundEvents.length > 0){
            Logger.info("Found "+foundEvents.length+" events for time = "+currentMilliseconds);
        }

        return foundEvents;
    };

    this.addAll = function (data) {
        for (var i = 0;i < data.length; i++) {
            var event = data[i];

            // building an index for time => event[]
            var eventsForTime = events[event.time];
            if( ! eventsForTime ){
                eventsForTime = new Array();
                events[event.time] = eventsForTime;
            }
            eventsForTime.push(event);
        }
    };

}