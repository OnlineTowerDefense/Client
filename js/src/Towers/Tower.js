Tower = function(config){
    this.____init(config);
};

Tower.prototype = {

    ____init:function(config){

        Konva.Image.call(this, config);
    }

};
Konva.Util.extend(Tower, Konva.Image);