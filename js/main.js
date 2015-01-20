$(function(){

    var loader = new Kinetic.Loader(config.assets);
    var game = new Game('js/example_data.json','game');

    loader.onComplete(function(){
        game.ready = true;
    });
    loader.load();

    game.run();
});