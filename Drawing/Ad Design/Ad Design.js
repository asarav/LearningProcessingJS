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
        var moveRight = true;
        var moneySignX = 178;
        draw = function() {
            //Top messages
            fill(0, 0, 0);
            textSize(31);
            text("FREE MONEY!", 68, 30);
            textSize(15);
            fill(255, 0, 0);
            text("It's just free money. What else do you need?!?", 33, 87);
            
            //Dollar bill
            fill(75, 125, 102);
            rect(77, 143, 229, 111);
            fill(0, 0, 0);
            rect(77, 143, 28, 28);
            rect(278, 143, 28, 28);
            rect(277, 226, 28, 28);
            rect(77, 225, 28, 28);
        
        
            //Dollar sign
            fill(255, 255, 255);
            textSize(64);
            text("$", moneySignX, 217);
            
            //Move dollar sign left and right
            if(moveRight) {
                moneySignX++;
            } else {
                moneySignX--;
            }
            
            if(moneySignX > 200) {
                moveRight = false;   
            } else if(moneySignX < 100) {
                moveRight = true;
            }
            
            //Bottom Message
            fill(93, 26, 181);
            textSize(15);
            text("Get yours today!", 139, 324);
        };              
    }
    if (typeof draw !== 'undefined') processing.draw = draw;
});