$(function(){

    var loader = new Kinetic.Loader(config.assets);
    var game = new Game();

    loader.onComplete(function(){
        game.ready = true;
    });
    loader.load();

    game.run();
});