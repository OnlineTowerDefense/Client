Tower = function(config){
    this.____init(config);
};

Tower.prototype = {

    ____init:function(config) {

        Konva.Image.call(this, config);
        this.className = 'Tower';
        this.rotationAngle = -1;
        this.target = null;
        this.setOffset({x:this.getWidth()/2,y:this.getHeight()/2});
        this.on('TOWER_NEW_TARGET', function (data) {
            var towerName = 'tower_' + data.towerId;
            if(towerName !== this.getId()){
                return false;
            }

            if(this.target == null){
                var unitName = 'unit_'+data.attackerId;
                this.target  = this.getStage().find('#'+unitName)[0];
                return false;
            }


            var delta = {
                x: this.target.getX() - this.getX(),
                y: this.target.getY() - this.getY()
            };
            var angleTo = Math.atan2(delta.y,delta.x);
            var angle = ~~Math.Util.radToDeg(angleTo);

            if(this.rotationAngle !== angle){
               var oldOffset = this.getOffset();


                this.setRotation(angle);

                this.rotationAngle = angle;
            }


        });

        this.on('TOWER_LOST_TARGET',function(data){
            this.target = null;
            this.setRotation(0);
        });
    }


};
Konva.Util.extend(Tower, Konva.Image);