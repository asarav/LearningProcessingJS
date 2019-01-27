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
        background(0, 94, 255);
        noStroke();
        ellipse(width * 3/4, height * 1/4, 20, 20);

        //Clouds
        var xOff = 0.0;
        for (var x = 0; x < width; x++) {
            var yOff = 0.0;
            for (var y = 0; y < height; y++) {
                var bright = map(noise(xOff, yOff), 0, 1, 0, 255);
                //The last param is used for opacity
                stroke(bright, bright, bright, bright);
                point(x, y);
                yOff += 0.01;
            }
            xOff += 0.01;
        }

        //White mountain range in background
        var drawRange = function() {
            stroke(233, 235, 230);
            var incAmount = 0.02;
            for (var t = 0; t < incAmount*width; t += incAmount) {
                var n = noise(t);
                var y = map(n, 0.1, 0.54, 0, height/2);
                rect(t*100, height-y, 1, y);
            }
        };

        var drawRange2 = function() {
            stroke(10, 71, 32);
            var incAmount = 0.01;
            for (var t = 0; t < (incAmount*width + 30) + 100; t += incAmount) {
                var n = noise(t);
                var y = map(n, 0.2234, 0.55, 0, height/4);
                rect(t*100 - 30, height-y, 1, y);
            }
        };

        //Ground
        var drawRange3 = function() {
            stroke(69, 34, 48);
            var incAmount = 0.01;
            for (var t = 0; t < (incAmount*width) + 200; t += incAmount) {
                var n = noise(t);
                var y = map(n, 0.3, 2, 0, height/4);
                rect(t*100, height-y, 1, y);
            }
        };

        var drawTrees = function() {
            stroke(24, 133, 89);
            var incAmount = 0.22341;
            for (var t = 0; t < incAmount*width; t += incAmount) {
                var n = noise(t);
                var y = map(n, 0.1, 0.515, 0, height/2);
                rect(t*100, height-y, 1, y);
            }
        };

        drawTrees();
        drawRange();
        drawRange2();
        drawRange3();
    }
    if (typeof draw !== 'undefined') processing.draw = draw;
});