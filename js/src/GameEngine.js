function Game(dataUrl, stageId) {
    var self = this;
    this.ready = false;
    this.initialized = false;
    this.maxFPS = 60;
    this.browser = $(document);
    this.dataUrl = dataUrl;

    this.stageId = stageId;


    function init() {
        self.ready = false;

        var height = 840;
        var width = 1080;

        var eventQueue = new EventQueue();
        var eventController = new EventController();

        var layer = new Konva.Layer({id: 'objects'});
        var stage = new Konva.Stage({
            container: self.stageId,
            width: width,
            height: height
        });
        layer.add(new Konva.Image({image:Konva.Assets.background}));



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


        stage.add(layer);

        eventController.setStage(stage);
        eventController.setLayer(layer);




        $.getJSON(self.dataUrl, function (data) {
            self.ready = true;
            eventQueue.addAll(data);
            animation.start();
        });

        self.initialized = true;
    }

    this.run = function () {
        if (!this.initialized) {
            init();
        }
    }
}