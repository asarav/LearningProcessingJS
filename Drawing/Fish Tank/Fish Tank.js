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
        var drawFish = function(centerX, centerY, bodyLength, bodyHeight, bodyColor, eyeColor) {
            noStroke();
            fill(bodyColor);
            // body
            ellipse(centerX, centerY, bodyLength, bodyHeight);
            // tail
            var tailWidth = bodyLength/4;
            var tailHeight = bodyHeight/2;
            triangle(centerX-bodyLength/2, centerY,
                     centerX-bodyLength/2-tailWidth, centerY-tailHeight,
                     centerX-bodyLength/2-tailWidth, centerY+tailHeight);
            // eye
            fill(eyeColor);
            ellipse(centerX+bodyLength/4, centerY, bodyHeight/5, bodyHeight/5);
        };
        
        var drawSeaweed = function(posX, posY) {
            fill(22, 71, 14);
            ellipse(posX, posY, 12, 80);
        };
        
        background(89, 216, 255);
        drawFish(200, 100, 118, 74, color(0, 94, 255), color(255, 0, 0));
        drawFish(100, 200, 100, 50, color(162, 0, 255), color(18, 17, 17));
        drawFish(200, 300, 50, 100, color(255, 128, 0), color(255, 183, 0));
        drawFish(300, 200, 150, 30, color(0, 255, 81), color(36, 57, 163));
        drawSeaweed(10, 361);
        drawSeaweed(50, 361);
        drawSeaweed(294, 363);
        drawSeaweed(150, 361);
        drawSeaweed(200, 361);
        
        mouseClicked = function() {
          drawFish(mouseX, mouseY, 150, 30, color(230, 0, 255), color(255, 47, 0));
        };                  
    }
    if (typeof draw !== 'undefined') processing.draw = draw;
});