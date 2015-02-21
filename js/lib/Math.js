Math.Util = {
    squaredDistance: function (x1, y1, x2, y2) {
        return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    },
    distance: function (x1, y1, x2, y2) {
        var squaredDistance = this.squaredDistance(x1, y1, x2, y2);
        return Math.sqrt(parseFloat(squaredDistance));
    },
    radToDeg: function (angleInRad) {
        return angleInRad * 180 / Math.PI;
    },
    degToRad: function (angleInDeg) {
        return angleInDeg * Math.PI / 180;
    },
    angle: function(fromX, fromY, toX, toY){
        var angleTo = Math.atan2(toY - fromY,toX - fromX);
        return ~~Math.Util.radToDeg(angleTo);
    }
};
