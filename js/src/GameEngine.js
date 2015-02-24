function Game(events, fight, dungeonBlueprint, stageId, baseUrl) {
    var self = this;
    this.ready = false;
    this.initialized = false;
    this.maxFPS = 60;
    this.browser = $(document);

    this.stageId = stageId;

    this.events = events;
    this.fight = fight;
    this.dungeonBlueprint = dungeonBlueprint;


    function init() {
        self.ready = false;

        var height = self.dungeonBlueprint.height;
        var width = self.dungeonBlueprint.width;

        var eventQueue = new EventQueue();
        var eventController = new EventController();

        var layer = new Konva.Layer({id: 'objects'});
        var backgrounds = new Konva.Layer({id: 'backgrounds'});

        var stage = new Konva.Stage({
            container: self.stageId,
            width: width,
            height: height,
            draggable: true,
            dragBoundFunc: function(pos) {
                var containerHeight = $('#game').height();
                var containerWidth = $('#game').width();

                var x = pos.x;
                var y = pos.y;

                if( x > 0){
                    x = 0;
                }
                if( y > 0){
                    y = 0;
                }
                if( y < (containerHeight - stage.height())){
                    y = containerHeight - stage.height();
                }
                if( x < (containerWidth - stage.width())){
                    x = containerWidth - stage.width();
                }

                return { x: x, y: y };
            }
        });

        backgrounds.add(
            new Konva.Image({
                image:Konva.Assets[self.dungeonBlueprint.name]
            }));

        var ticksPerSecond = 25;
        var skipTicks = 1000/ticksPerSecond;
        var maxFrameSkip = 5;
        var nextGameTick = new Date().getMilliseconds();
        var interpolation = 0.0;

        // GameLoop through an Animation
        var animation = new Konva.Animation(function (frame) {
            if (!self.ready) {
                return false;
            }
            var loops = 0;
            while(frame.time > nextGameTick && loops < maxFrameSkip){
                self.browser.trigger('update', frame);
                nextGameTick +=skipTicks;
                loops++;
            }
            interpolation = (frame.time + skipTicks - nextGameTick) /skipTicks;

            self.browser.trigger('draw', {frame:frame,interpolation:interpolation});
        });



        self.browser.on('draw', function (event, frame) {

            stage.draw();
        }).on('update', function (event, frame) {
            if (eventQueue.isEmpty()) {
                animation.stop();
                return false;
            }
            var currentMilliseconds = Math.floor( frame.time );

            var events = eventQueue.popEvents(currentMilliseconds);
            if( events && events.length > 0){
                eventController.processEvents(events);
            }

            stage.find('.object').each(function (obj) {
                obj.fire('tick', {time:currentMilliseconds}, true);
            });
        });

        stage.add(backgrounds);
        stage.add(layer);

        eventController.setStage(stage);
        eventController.setObjectLayer(layer);
        eventController.setBackgroundLayer(backgrounds);


        eventQueue.addAll(events);
        animation.start();

        self.ready = true;
        self.initialized = true;
    }

    this.run = function () {
        if (!this.initialized) {
            init();
        }
    }
}