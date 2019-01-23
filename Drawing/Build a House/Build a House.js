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
        background(219, 255, 255);

        //Chimney
        fill(64, 6, 6);
        rect(54, 75, 53, 73);
        
        fill(174, 180, 214);
        triangle(200, 28, 350, 150, 50, 150);
        
        fill(255, 255, 255);
        rect(60, 150, 280, 207);
        
        fill(255, 0, 0);
        strokeWeight(10);
        stroke(41, 28, 28);
        //Bricks
        for(var i = 60; i < 320; i += 40) {
            for(var j = 153; j < 351; j += 20) {
                rect(i, j, 40, 20);
            }
        }
        
        strokeWeight(1);
        //Windows
        for(var x = 80; x < 300; x += 50) {
            fill(0, 217, 255);
            rect(x, 166, 40, 40);
        }
        
        fill(92, 67, 29);
        rect(180, 280, 40, 77);      
    }
    if (typeof draw !== 'undefined') processing.draw = draw;
});