$(function(){

    var userId = queryParameter('userId');
    var fightId = queryParameter('fightId');

    var access_token = queryParameter('access_token'); //'2d2779d1-4a73-4a40-bc06-f61de8bc8fea';

    var eventsUrl = 'js/example_events.json'
    var fightUrl = 'js/example_fight.json'
    var dungeonBlueprintUrl = 'js/example_dungeonblueprint.json'

    var events = [];
    var fight = {};
    var dungeonBlueprint = {};

    if( userId && fightId && access_token){
        eventsUrl = "http://localhost:8080/api/v1/user/"+userId+"/fight/"+fightId+"/events";
        fightUrl =  "http://localhost:8080/api/v1/user/"+userId+"/fight/"+fightId;
        dungeonBlueprintUrl = "http://localhost:8080/api/v1/dungeonBlueprint/";


        // SUPERBAD...uhoh...SUPER BAD...whatever...
        $.ajaxSetup({
            headers: { Authorization: "Bearer "+access_token },
            async: false
        });

        $.getJSON(eventsUrl, function (eventsData) {
            events = eventsData;
        });
        $.getJSON(fightUrl, function (fightData) {
            fight = fightData;
            $.getJSON(dungeonBlueprintUrl+fight.dungeonBlueprintId, function (dungeonBlueprintData) {
                dungeonBlueprint = dungeonBlueprintData;
            });
        });


    }else{
        $.ajaxSetup({
            async: false
        });

        $.getJSON(eventsUrl, function (eventsData) {
            events = eventsData;
        });
        $.getJSON(fightUrl, function (fightData) {
            fight = fightData;
        });
        $.getJSON(dungeonBlueprintUrl, function (dungeonBlueprintData) {
            dungeonBlueprint = dungeonBlueprintData;
        });
    }

    var loader = new Konva.Loader(config.assets);
    var game = new Game(events, fight, dungeonBlueprint, 'game');

    loader.onComplete(function(){
    });
    loader.load();

    game.run();

});