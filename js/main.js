$(function(){

    var userId = queryParameter('userId');
    var fightId = queryParameter('fightId');

    var access_token = queryParameter('access_token'); //'2d2779d1-4a73-4a40-bc06-f61de8bc8fea';

    var url = 'js/example_data.json';
    if( userId && fightId && access_token){
        url = "http://localhost:8080/api/v1/user/"+userId+"/fight/"+fightId+"/events";
        $.ajaxSetup({
            headers: { Authorization: "Bearer "+access_token }
        });
    }

    var loader = new Konva.Loader(config.assets);
    var game = new Game(url,'game');

    loader.onComplete(function(){
        game.ready = true;
    });
    loader.load();

    game.run();

});