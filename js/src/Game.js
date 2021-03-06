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

        var ticksPerSecond = 25;
        var skipTicks = 1000/ticksPerSecond;
        var maxFrameSkip = 5;
        var nextGameTick = new Date().getMilliseconds();
        var interpolation = 0.0;
        var animation = new Kinetic.Animation(function (frame) {
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

            dispatcher.trigger(frame.time);
        }).on('mousemove',function(event){
            return false;
            var objects = stage.find('.object')[0];
             var deltaY = event.pageY -objects.getY();
            var deltaX =  event.pageX -objects.getX();
            var that = {x:objects.getX(),y:objects.getY()};
            var vector = {x:event.pageX,y:event.pageY};
            var angleParam1 = that.x*vector.y - that.y * vector.x;
            var angleParam2 = that.x * vector.x + that.y * vector.x;

            var angleBetween = Math.atan2(deltaY,deltaX);
            var angle = Math.Util.radToDeg(angleBetween);
            objects.rotate(angleBetween);
            console.log(angle);
           // console.log(event.pageX,event.pageY);
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