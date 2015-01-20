function Game(dataUrl, stageId) {
    var self = this;
    this.ready = false;
    this.initialized = false;
    this.maxFPS = 25;
    this.browser = $(document);
    this.dataUrl = dataUrl;
    this.eventData = null;
    this.stageId = stageId;
    this.stage = null;

    function init() {
        self.ready = false;
        var height = self.browser.height();
        var width = self.browser.width();

        $.getJSON(self.dataUrl, function (data) {
            self.ready = true;
            self.eventData = data;
        });


        var stage = new Kinetic.Stage({
            container: self.stageId,
            width: width,
            height: height
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
            stage.fire('update', frame, true);
        });

        var layer = new Kinetic.Layer({name: 'objects'});
        stage.add(layer);

        self.stage = stage;
        self.initialized = true;
    }

    this.run = function () {
        if (!this.initialized) {
            init();
        }
        var game = this;
        var frameCounter = 0;
        var anim = new Kinetic.Animation(function (frame) {
            if (!game.ready) {
                return false;
            }

            game.browser.trigger('update', frame);
            if (++frameCounter % game.maxFPS == 0) {
                game.browser.trigger('draw', frame);
            }
        });
        anim.start();
    }
}