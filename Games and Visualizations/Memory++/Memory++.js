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
        // Scroll down to "About" for instructions on this project ↓
        /* Added hover states for all of the tiles
        * Added timer to the top of the game. Timer stops when game is completed.
        * Added restart button
        * Updated style for the win state.
        * Add a lose state
        * Add a counter for number of matches
        * Add a counter for number of tries
        * Added an answers button that flips over all of the tiles.
        */
        var Tile = function(x, y, face) {
            this.x = x;
            this.y = y;
            this.width = 70;
            this.face = face;
            this.isFaceUp = false;
            this.isMatch = false;
        };

        var start = millis();
        var finish;
        var flipped = false;

        Tile.prototype.draw = function() {
            fill(214, 247, 202);
            strokeWeight(2);
            rect(this.x, this.y, this.width, this.width, 10);
            if (this.isFaceUp) {
                image(this.face, this.x, this.y, this.width, this.width);
            } else {
                image(getImage("avatars/leaf-green"), this.x, this.y, this.width, this.width);
            }
        };

        Tile.prototype.isUnderMouse = function(x, y) {
            return x >= this.x && x <= this.x + this.width  &&
                y >= this.y && y <= this.y + this.width;
        };

        Tile.prototype.mouseOver = function() {
            if(!this.isFaceUp) {
                fill(214, 247, 202);
                strokeWeight(2);
                rect(this.x, this.y, this.width, this.width, 10);
                image(getImage("avatars/leaf-red"), this.x, this.y, this.width, this.width);
            }
        };

        // Global config
        var NUM_COLS = 5;
        var NUM_ROWS = 4;

        // Declare an array of all possible faces
        var faces = [
            getImage("avatars/leafers-seed"),
            getImage("avatars/leafers-seedling"),
            getImage("avatars/leafers-sapling"),
            getImage("avatars/leafers-tree"),
            getImage("avatars/leafers-ultimate"),
            getImage("avatars/marcimus"),
            getImage("avatars/mr-pants"),
            getImage("avatars/mr-pink"),
            getImage("avatars/old-spice-man"),
            getImage("avatars/robot_female_1")
        ];

        // Make an array which has 2 of each, then randomize it
        var possibleFaces = faces.slice(0);
        var selected = [];
        for (var i = 0; i < (NUM_COLS * NUM_ROWS) / 2; i++) {
            // Randomly pick one from the array of remaining faces
            var randomInd = floor(random(possibleFaces.length));
            var face = possibleFaces[randomInd];
            // Push twice onto array
            selected.push(face);
            selected.push(face);
            // Remove from array
            possibleFaces.splice(randomInd, 1);
        }

        // Now shuffle the elements of that array
        var shuffleArray = function(array) {
            var counter = array.length;

            // While there are elements in the array
            while (counter > 0) {
                // Pick a random index
                var ind = Math.floor(Math.random() * counter);
                // Decrease counter by 1
                counter--;
                // And swap the last element with it
                var temp = array[counter];
                array[counter] = array[ind];
                array[ind] = temp;
            }
        };
        shuffleArray(selected);

        // Create the tiles
        var tiles = [];
        for (var i = 0; i < NUM_COLS; i++) {
            for (var j = 0; j < NUM_ROWS; j++) {
                var tileX = i * 78 + 10;
                var tileY = j * 78 + 40;
                var tileFace = selected.pop();
                tiles.push(new Tile(tileX, tileY, tileFace));
            }
        }

        background(255, 255, 255);

        var numTries = 0;
        var numMatches = 0;
        var flippedTiles = [];
        var delayStartFC = null;

        mouseClicked = function() {
            for (var i = 0; i < tiles.length; i++) {
                var tile = tiles[i];
                if (tile.isUnderMouse(mouseX, mouseY)) {
                    if (flippedTiles.length < 2 && !tile.isFaceUp) {
                        tile.isFaceUp = true;
                        flippedTiles.push(tile);
                        if (flippedTiles.length === 2) {
                            numTries++;
                            if (flippedTiles[0].face === flippedTiles[1].face) {
                                flippedTiles[0].isMatch = true;
                                flippedTiles[1].isMatch = true;
                                flippedTiles.length = 0;
                                numMatches++;
                            }
                            delayStartFC = frameCount;
                        }
                    } 
                    loop();
                }
            }
            
            if(mouseX >= 0 && mouseX <= 100 && mouseY >= 3 && mouseY <= 33) {
                Program.restart();
            }
            
            if(mouseX >= 280 && mouseY >= 350 && mouseX <= 351 && mouseY <= 390 && !flipped) {
                for(var i = 0; i < tiles.length; i++) {
                    tiles[i].isFaceUp = true;   
                }
                flipped = true;
            } else if(mouseX >= 280 && mouseY >= 350 && mouseX <= 351 && mouseY <= 390 && flipped) {
                for(var i = 0; i < tiles.length; i++) {
                    tiles[i].isFaceUp = false;   
                }
                flipped = false;
            }
        };

        draw = function() {
            background(109, 222, 222);
            if (delayStartFC && (frameCount - delayStartFC) > 30) {
                for (var i = 0; i < tiles.length; i++) {
                    var tile = tiles[i];
                    if (!tile.isMatch) {
                        tile.isFaceUp = false;
                    }
                }
                flippedTiles = [];
                delayStartFC = null;
                noLoop();
            }
            
            for (var i = 0; i < tiles.length; i++) {
                tiles[i].draw();
            }
            
            //Draw Time
            
            rect(0, 3, 100, 30, 5);
            rect(280, 350, 71, 40, 5);
            fill(255, 0, 0);
            textSize(15);
            text("Restart", 21, 22);

            text("Time: " + finish, 160, 23);
            
            text("Tries: " + numTries, 240, 23);
            text("Matches: " + numMatches, 310, 23);
            text("Answers", 290, 375);
            
            if (numMatches === tiles.length/2) {
                fill(0, 0, 0);
                textSize(20);
                fill(0, 255, 136);
                rect(10, 350, 300, 40, 5);
                fill(255, 0, 0);
                text("You found them all in " + numTries + " tries!", 20, 375);
            } else if(numTries > 25) {
                fill(0, 0, 0);
                textSize(20);
                fill(255, 119, 0);
                rect(10, 350, 120, 40, 5);
                fill(240, 228, 228);
                text("You Lose!", 20, 375);
            } else {
                finish = (((millis()-start)/1000).toFixed(2));
            }
            
            for (var i = 0; i < tiles.length; i++) {
                if(tiles[i].isUnderMouse(mouseX, mouseY)) {
                    tiles[i].mouseOver();
                }
            }
        };

        noLoop();
    }
    if (typeof draw !== 'undefined') processing.draw = draw;
});