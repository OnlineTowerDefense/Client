function Game(){
    var self = this;
    this.ready = false;
    this.initialized = false;
    this.maxFPS = 25;
    this.browser = $(document);


    function init(){
        self.browser.on('draw',function(event,data){


        });
        self.initialized = true;
    }

    this.run = function(){
        if(!this.initialized){
            init();
        }
        var game = this;
        var frameCounter = 0;
        var anim = new Kinetic.Animation(function(frame) {
            if(!game.ready){
                return false;
            }

            game.browser.trigger('update',frame);
            if(++frameCounter % game.maxFPS == 0 ){
                game.browser.trigger('draw',frame);
            }
        });
        anim.start();
    }
}