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
        var url = "https://www.kasandbox.org/programming-images/" + s + ".png";
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
        var xPos = 231;
        var yPos = 355;
        var xPos2 = xPos;
        var moonXPos = -10;
        var backgroundStarSize = 5;

        draw = function() {
            //Shooting Stars
            background(29, 40, 115);
            fill(255, 242, 0);
            ellipse(xPos, yPos, 10, 10);
            ellipse(xPos2, yPos, 10, 10);
            
            //Background Stars
            fill(255, 149, 0);
            rect(10, 24, backgroundStarSize, backgroundStarSize);
            rect(272, 168, backgroundStarSize, backgroundStarSize);
            rect(118, 289, backgroundStarSize, backgroundStarSize);
            rect(359, 289, backgroundStarSize, backgroundStarSize);
            rect(244, 319, backgroundStarSize, backgroundStarSize);

            //Moon
            fill(255, 255, 255);
            ellipse(moonXPos, 120, 50, 50);
            
            //Canon
            fill(94, 34, 0);
            rect(212, 355, 47, 61);

            xPos += 0.25;
            xPos2 -= 0.25;
            yPos--;
            moonXPos++;
        };
    }
    if (typeof draw !== 'undefined') processing.draw = draw;
});