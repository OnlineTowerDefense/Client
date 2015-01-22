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
        var height = 840;
        var width = 1080;
        var dispatcher = new EventDispatcher();
        var layer = new Kinetic.Layer({id: 'objects'});
        var stage = new Kinetic.Stage({
            container: self.stageId,
            width: width,
            height: height
        });
        layer.add(new Kinetic.Image({image:Kinetic.Assets.background}));

        stage.on('DEFENDER_SPAWN', function (data) {

        }).on('ATTACKER_SPAWN', function (data) {
            var unitName = 'unit_' + data.id;
            if (stage.find('#' + unitName).length != 0) {
                return false;
            }
            if(data.attackerType == 'GRUNT'){
                var unit = new Grunt({x: data.x, y: data.y, id: unitName});

            }
            if(data.attackerType == 'RUNNER'){
                var unit = new Runner({x: data.x, y: data.y, id: unitName});
            }
            layer.add(unit);

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
        },layer);



        self.browser.on('draw', function (event, frame) {
            stage.draw();
        }).on('update', function (event, frame) {
            if (dispatcher.finished) {
                animation.stop();
                return false;
            }
            stage.find('.object').each(function(obj){
                obj.fire('update',frame);
            });
            dispatcher.update(frame);
        });


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