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
        var dispatcher = new EventDispatcher();
        var layer = new Konva.Layer({id: 'objects'});
        var stage = new Konva.Stage({
            container: self.stageId,
            width: width,
            height: height
        });
        layer.add(new Konva.Image({image:Konva.Assets.background}));

        stage.on('DEFENDER_SPAWN', function (data) {
            var towerName = 'tower_'+data.id;
            if (stage.find('#' + towerName).length != 0) {
                return false;
            }
            if(data.towerType == 'FLAMER'){
                var tower = new Flamer({x: data.x, y: data.y, id: towerName});

            }
            layer.add(tower);
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

        var ticksPerSecond = 25;
        var skipTicks = 1000/ticksPerSecond;
        var maxFrameSkip = 5;
        var nextGameTick = new Date().getMilliseconds();
        var interpolation = 0.0;
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
            if (dispatcher.finished) {
                animation.stop();
                return false;
            }
            $('#slider').slider( "option", "value", frame.time );
            dispatcher.trigger(frame.time);
        });


        stage.add(layer);

        dispatcher.setStage(stage);

        $.getJSON(self.dataUrl, function (data) {
            self.ready = true;
            dispatcher.setData(data);
            dispatcher.trigger(0);
            animation.start();
        });

        self.initialized = true;
        $('#slider').slider({
            min:0,
            max:107664,
            step:1,
            slide:function(event,ui){
               var value = ui.value;

                dispatcher.trigger(value);
            }
        });
    }

    this.run = function () {
        if (!this.initialized) {
            init();
        }
    }
}