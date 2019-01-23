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
        fill(0, 0, 0);
        ellipse(200, 200, 375, 375);
        fill(60, 0, 255);
        triangle(200, 104, 280, 280, 120, 280);
        fill(255, 255, 255);
        var answer = floor(random(1, 5));//The random function returns a random number starting at 1 and up to (but not including) 5. Floor ensures that all numbers are integers.
        if (answer === 1) {
            fill(255, 255, 255);
            text("42", 190, 200);
        } else if(answer === 2) {
            fill(153, 46, 153);
            text("Hard Work", 176, 220);
        } else if(answer === 3) {
            fill(56, 201, 87);
            text("Never Give Up", 160, 225);
        } else if(answer === 4) {
            fill(232, 230, 139);
            text("I don't know", 172, 222);
        }           
    }
    if (typeof draw !== 'undefined') processing.draw = draw;
});