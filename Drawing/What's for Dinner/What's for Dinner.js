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
        background(186, 145, 20); // wooden table
        fill(255, 0, 0);
        ellipse(200, 200, 350, 350); // plate
        fill(247, 232, 247);
        stroke(0, 4, 255);
        ellipse(200, 200, 300, 300); 

        //Steak
        stroke(0, 0, 0);
        fill(110, 68, 68);
        ellipse(150, 200, 100, 100);

        //Broccoli
        fill(5, 64, 53);
        ellipse(200, 240, 15, 15);
        ellipse(220, 220, 15, 15);
        ellipse(240, 240, 15, 15);
        rect(215, 250, 10, 50);

        line(200, 240, 216, 250);
        line(220, 220, 221, 250);
        line(240, 240, 222, 261);

        //Lots o Peas
        fill(0, 255, 132);
        ellipse(200, 106, 15, 15);
        ellipse(220, 125, 15, 15);
        ellipse(240, 109, 15, 15);
        ellipse(220, 106, 15, 15);
        ellipse(196, 125, 15, 15);
        ellipse(264, 109, 15, 15);
    }
    if (typeof draw !== 'undefined') processing.draw = draw;
});