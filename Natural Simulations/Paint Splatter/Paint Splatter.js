var canvas = document.getElementById("canvas");
var processing = new Processing(canvas, function(processing) {
    processing.size(400, 400);
    processing.background(0xFFF);

    var mouseIsPressed = false;
    processing.mousePressed = function () { mouseIsPressed = true; };
    processing.mouseReleased = function () { mouseIsPressed = false; };

    var keyIsPressed = false;
    processing.keyPressed = function () { keyIsPressed = true; };
    processing.keyReleased = function () { keyIsPressed = false; };

    function getImage(s) {
        var url = "https://raw.githubusercontent.com/Khan/live-editor/master/images/" + s + ".png";
        processing.externals.sketch.imageCache.add(url);
        return processing.loadImage(url);
    }

    // use degrees rather than radians in rotate function
    var rotateFn = processing.rotate;
    processing.rotate = function (angle) {
        rotateFn(processing.radians(angle));
    };

    with (processing) {
        // INSERT YOUR KHAN ACADEMY PROGRAM HERE
        //Used to get a guassian distribution
        var normalDistribution = function(mean, standardDeviation) {
            return standardDeviation * randomGaussian() + mean;
        };
        
        draw = function() {
            //Position
            var x = floor(normalDistribution(200, 50));
            var y = floor(normalDistribution(200, 50));
        
            //Color of paint splatter
            fill(floor(normalDistribution(128, 64)),
                floor(normalDistribution(128, 64)),
                floor(normalDistribution(128, 64)));
        
            ellipse(x, y, 5, 5);
        };                
    }
    if (typeof draw !== 'undefined') processing.draw = draw;
});