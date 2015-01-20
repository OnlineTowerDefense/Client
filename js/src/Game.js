function Game(dataUrl, stageId) {
    var self = this;
    this.ready = false;
    this.initialized = false;
    this.maxFPS = 25;
    this.browser = $(document);
    this.dataUrl = dataUrl;

    this.stageId = stageId;


    function init() {
        self.ready = false;
        var height = self.browser.height();
        var width = self.browser.width();
        var dispatcher = new EventDispatcher();

        var stage = new Kinetic.Stage({
            container: self.stageId,
            width: width,
            height: height
        });


        var frameCounter = 0;
        var animation = new Kinetic.Animation(function (frame) {
            if (!self.ready) {
                return false;
            }
            self.browser.trigger('update', frame);
            if (++frameCounter % game.maxFPS == 0) {
                self.browser.trigger('draw', frame);
            }
        });

        $(window).on('resize', function () {
            var height = $(this).height();
            var width = $(this).width();
            stage.setHeight(height);
            stage.setWidth(width);
        });

        self.browser.on('draw', function (event, frame) {
            stage.draw();
        }).on('update', function (event, frame) {
            dispatcher.update(frame);
        });

        var layer = new Kinetic.Layer({name: 'objects'});
        stage.add(layer);

        dispatcher.setStage(stage);

        $.getJSON(self.dataUrl, function (data) {
            self.ready = true;
            dispatcher.setData(data);
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