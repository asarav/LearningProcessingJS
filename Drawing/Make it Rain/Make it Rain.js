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
        var xPositions = [];
        var yPositions = [];
        var colors = [];
        var showStar = [];//Used to figure out whether to show a star or a raindrop
        
        var star = getImage("space/star");
        
        var addColor = function() {
            colors.push(color(floor(random(255)), floor(random(255)), floor(random(255))));
        };
        
        for(var i = 0; i < 50; i++) {
            xPositions.push(floor(random(400)));
            yPositions.push(floor(random(400)));
            if(floor(random(2)) === 0) {
                showStar.push(false);
            } else {
                showStar.push(true);
            }
            addColor();
        }
        
        draw = function() {
            background(204, 247, 255);
        
            for (var i = 0; i < xPositions.length; i++) {
                noStroke();
                if(showStar[i]) {
                    image(star, xPositions[i], yPositions[i], 30, 30);//Make it rain stars
                } else {
                    fill(colors[i]);
                    ellipse(xPositions[i], yPositions[i], 8, 12);//Make it rain raindrops
                }
                yPositions[i] += 5;
                if(yPositions[i] > 400) {
                    yPositions[i] = 0;   
                }
            }
            
        };
        
        //Draws raindrops where the mouse is clicked
        mouseClicked = function() {
            xPositions.push(mouseX);
            yPositions.push(mouseY);
            addColor();
            showStar.push(false);
        };            
    }
    if (typeof draw !== 'undefined') processing.draw = draw;
});