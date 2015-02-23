function EventController() {
    this.stage = null;
    this.layer = null;

    this.processEvents = function(events) {

        for(var i=0; i<events.length; i++){
            var event = events[i];
            Logger.info("EventController: Processing "+event.type+" Event for element with id = "+event.elementId);
            if(event.type == 'DEFENDER_SPAWN'){

                if (this.stage.find('#' + event.elementId).length != 0) {
                    Logger.error("Tried to add already existing Element with id = "+event.elementId+" and towerType = "+event.towerType);
                    return false;
                }
                var tower = null;

                var base = new Konva.Image({
                        x: event.x,
                        y: event.y,
                        image:Konva.Assets.towerBase,
                        width: 50,
                        height: 50,
                        offset:{x:25, y:25}
                    });

                if(event.towerType == 'PLASMA'){
                    tower = new Flamer({ x: event.x, y: event.y, id: event.elementId, timeToReload:500 });
                } else if(event.towerType == 'GATTLING'){
                    tower = new Gattling({ x: event.x, y: event.y, id: event.elementId, timeToReload:200 });
                }else if(event.towerType == 'DISRUPTOR'){
                    tower = new Disruptor({ x: event.x, y: event.y, id: event.elementId, timeToReload:2000 });
                }else if(event.towerType == 'ROCKETLAUNCHER'){
                    tower = new RocketLauncher({ x: event.x, y: event.y, id: event.elementId, timeToReload:2000 });
                }

                this.objectLayer.add(tower);
                this.backGroundLayer.add(base);

            }else  if(event.type == 'ATTACKER_SPAWN'){
                if (this.stage.find('#' + event.elementId).length != 0) {
                    Logger.error("Tried to add already existing Element with id = "+event.elementId+" and attackerType = "+event.attackerType);
                    return false;
                }
                var unit = null;
                if(event.attackerType == 'GRUNT'){
                    unit = new Grunt({x: event.x, y: event.y, id: event.elementId});

                }
                if(event.attackerType == 'RUNNER'){
                    unit = new Runner({x: event.x, y: event.y, id: event.elementId});
                }

                this.objectLayer.add(unit);
            }else{
                var object = this.stage.find('#'+event.elementId);
                if (object.length == 0){
                    Logger.error("Tried to dispatch event to elementId = "+event.elementId+" which is not existing in stage for Event of type = "+event.type+".");
                }else{
                    object[0].fire(event.type, event, true);
                }
            }

        }

    };

    this.setStage = function (stage) {
        this.stage = stage;
    };

    this.setObjectLayer = function (layer) {
        this.objectLayer = layer;
    };

    this.setBackgroundLayer = function (layer) {
        this.backGroundLayer = layer;
    };

}