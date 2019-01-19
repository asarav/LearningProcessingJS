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
        var bodyX = 200;
        var bodyY = 220;
        var bodyW = 118;
        var bodyH = bodyW/2;
        
        var armWidth = 10;
        
        draw = function() {
            background(207, 254, 255);
            fill(240, 209, 36);
            
            ellipse(bodyX, bodyY, bodyW, 106); // body
            strokeWeight(armWidth);
            line(bodyX - 32, bodyY - 37, bodyX - 100, bodyY - 128); //Left Arm
            line(bodyX + 32, bodyY - 37, bodyX + 100, bodyY - 128); //Right Arm
            
            line(bodyX - 32, bodyY + 48, bodyX - 93, bodyY + 129); //Left Leg
            line(bodyX + 32, bodyY + 48, bodyX + 93, bodyY + 129); //Left Right
            
            strokeWeight(1);
            ellipse(bodyX, bodyY-70, bodyH, 47); // face
            
            fill(87, 49, 49);
            ellipse(bodyX - 24, bodyY - 93, 15, 15); //Left Ear
            ellipse(bodyX + 24, bodyY - 93, 15, 15); //Right Ear
        
            
            fill(115, 62, 62);
            ellipse(bodyX, bodyY + 98, 28, 100); //Tail
            
            bodyY--;
            if(bodyY < 10) {
                bodyY = 300;   
            }
        };        
    }
    if (typeof draw !== 'undefined') processing.draw = draw;
});