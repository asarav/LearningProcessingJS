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
        /* Changes Made:
        * Added Spikes that decrement the score.
        * Added a lose state if too many spikes are hit.
        * Updated the controls to allow for the beaver to go left and right
        * Made the win and lose states a little bit more flashy
        * Updated the labels at the top to show number of sticks and spikes that were hit.
        */

        var Beaver = function(x, y) {
            this.x = x;
            this.y = y;
            this.img = getImage("creatures/Hopper-Happy");
            this.sticks = 0;
            this.spikes = 0;
        };

        Beaver.prototype.draw = function() {
            fill(255, 0, 0);
            this.y = constrain(this.y, 0, height-50);
            image(this.img, this.x, this.y, 40, 40);
        };

        Beaver.prototype.hop = function() {
            this.img = getImage("creatures/Hopper-Jumping");
            this.y -= 5;
        };

        Beaver.prototype.left = function() {
            this.x -= 2.5;    
        };

        Beaver.prototype.right = function() {
            this.x += 2.5;   
        };

        Beaver.prototype.fall = function() {
            this.img = getImage("creatures/Hopper-Happy");
            this.y += 5;
        };

        Beaver.prototype.checkForStickGrab = function(stick) {
            if ((stick.x >= this.x && stick.x <= (this.x + 40)) &&
                (stick.y >= this.y && stick.y <= (this.y + 40))) {
                stick.y = -400;
                this.sticks++;
            }
        };

        Beaver.prototype.checkForSpikeCollision = function(spike) {
            if ((spike.x >= this.x && spike.x <= (this.x + 40)) &&
                (spike.y >= this.y && spike.y <= (this.y + 40))) {
                spike.y = -400;
                this.spikes++;
            }
        };

        var Stick = function(x, y) {
            this.x = x;
            this.y = y;
        };

        Stick.prototype.draw = function() {
            fill(89, 71, 0);
            rectMode(CENTER);
            rect(this.x, this.y, 5, 40);
        };

        var Spike = function(x) {
            this.y = 380;
            this.x = x;
        };

        Spike.prototype.draw = function() {
            fill(204, 95, 74);
            ellipseMode(CENTER);
            ellipse(this.x, this.y, 5, 45);
        };


        var beaver = new Beaver(200, 300);

        var sticks = [];
        for (var i = 0; i < 40; i++) { 
            sticks.push(new Stick(i * 40 + 300, random(20, 260)));
        }

        var spikes = [];
        for (var i = 0; i < 40; i++) {
            if(floor(random(2)) === 1) {
                spikes.push(new Spike(i * 80 + 300));
            }
        }

        var grassXs = [];
        for (var i = 0; i < 25; i++) { 
            grassXs.push(i*20);
        }

        draw = function() {
            
            // static
            background(227, 254, 255);
            fill(130, 79, 43);
            rectMode(CORNER);
            rect(0, height*0.90, width, height*0.10);
            
            for (var i = 0; i < grassXs.length; i++) {
                image(getImage("cute/GrassBlock"), grassXs[i], height*0.85, 20, 20);
                grassXs[i] -= 1;
                if (grassXs[i] <= -20) {
                    grassXs[i] = width;
                }
            }
            
            for (var i = 0; i < sticks.length; i++) {
                sticks[i].draw();
                beaver.checkForStickGrab(sticks[i]);
                sticks[i].x -= 1;
            }
            
            for (var i = 0; i < spikes.length; i++) {
                spikes[i].draw();
                beaver.checkForSpikeCollision(spikes[i]);
                spikes[i].x -= 1;
            }
            
            textSize(18);
            
            text("Score: " + (beaver.sticks - beaver.spikes), 20, 30);
            text("Sticks Collected: " + beaver.sticks, 20, 55);
            text("Spikes Hit: " + beaver.spikes, 20, 83);
            
            if (beaver.sticks/sticks.length >= 0.95) {
                fill(0, 255, 34);
                rect(197, 184, 246, 76);
                fill(255, 0, 0);
                textSize(36);
                text("YOU WIN!!!!", 100, 200);
            } else if(beaver.spikes/spikes.length >= 0.2) {
                fill(255, 0, 0);
                rect(207, 187, 254, 74);
                fill(255, 255, 255);
                textSize(36);
                text("YOU LOSE!!!!", 100, 200);
            }
            
            if (keyIsPressed && keyCode === UP) {
                beaver.hop();
            } else {
                beaver.fall();
            }
            
            if(keyIsPressed) {
                if(keyCode === LEFT) {
                    beaver.left();
                } else if(keyCode === RIGHT) {
                    beaver.right();   
                }
            }
            beaver.draw();
        };           
    }
    if (typeof draw !== 'undefined') processing.draw = draw;
});