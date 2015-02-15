Tower = function(config){
    this.____init(config);
};

Tower.prototype = {

    ____init:function(config) {

        Konva.Image.call(this, config);
        this.className = 'Tower';
        this.rotationAngle = -1;

        this.on('TOWER_NEW_TARGET', function (data) {
            var towerName = 'tower_' + data.towerId;
            if(towerName !== this.getId()){
                return false;
            }
            var unitName = 'unit_'+data.attackerId;
            var unit = this.getStage().find('#'+unitName)[0];

            var delta = {
                x: unit.getX() - this.getX(),
                y: unit.getY() - this.getY()
            };
            var angleTo = Math.atan2(delta.y,delta.x);
            var angle = ~~Math.Util.radToDeg(angleTo);

            if(this.rotationAngle !== angle){
               var oldOffset = this.getOffset();

                var newOffset = {x: -this.getWidth()/2,y:-this.getHeight()/2};
                this.setOffset(newOffset);
                this.setRotation(angle);
                this.setOffset(oldOffset);
                this.rotationAngle = angle;
            }


        });
    }


};
Konva.Util.extend(Tower, Konva.Image);