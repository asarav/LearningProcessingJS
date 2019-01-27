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
        //Worked off of the mover code.
        //Created predator and prey objects that inherit from the mover.
        //The predators chase the prey.
        //The prey's velocity is determined by randomness

        var Mover = function() {
        this.position = new PVector(random(width), random(height));
        this.velocity = new PVector(0, 0);
        this.acceleration = new PVector(0, 0);
        };

        var Prey = function() {
            Mover.call(this);
        };

        var Predator = function() {
            Mover.call(this);
        };

        Mover.prototype.checkEdges = function() {
        if (this.position.x > width) {
            this.position.x = 0;
        } 
        else if (this.position.x < 0) {
            this.position.x = width;
        }

        if (this.position.y > height) {
            this.position.y = 0;
        } 
        else if (this.position.y < 0) {
            this.position.y = height;
        }
        };

        var prey = new Prey();

        //The prey moves randomly across the canvas
        Prey.prototype.update = function() {
            var newPosition = new PVector(random(0, width), random(0, height));
            var dir = PVector.sub(newPosition, this.position);
            dir.normalize();
            dir.mult(0.2);
            this.acceleration = dir;
            this.velocity.add(this.acceleration);
            this.velocity.limit(4.5);//Allow for the predator to outrun the prey
            this.position.add(this.velocity);
            //Reverse velocity every once in a while to allow for more erratic behavior
            if(floor(random(0, 300)) === 1) {
                this.velocity.mult(-1);
            }
        };

        Prey.prototype.display = function() {
        stroke(0);
        strokeWeight(2);
        fill(76, 120, 158);
        ellipse(this.position.x, this.position.y, 12, 12);
        };

        //The predators chase after the prey
        Predator.prototype.update = function() {
            var dir = PVector.sub(prey.position, this.position);
            dir.normalize();
            dir.mult(0.2);
            this.acceleration = dir;
            this.velocity.add(this.acceleration);
            this.velocity.limit(5);
            this.position.add(this.velocity);
        };

        Predator.prototype.display = function() {
        stroke(0);
        strokeWeight(2);
        fill(255, 0, 0);
        triangle(this.position.x - 8, this.position.y, this.position.x + 8, this.position.y, this.position.x, this.position.y - 12);
        };

        var predators = [];

        for (var i = 0; i < 5; i++) {
            predators[i] = new Predator(); 
        }

        draw = function() {
            background(155, 204, 222);
            //Ground
            fill(36, 120, 72);
            rect(0, height - 40, width, 40);
            
            //Sun
            fill(255, 230, 0);
            ellipse(90, 40, 50, 50);
            
            for (var i = 0; i < predators.length; i++) {
                predators[i].update();
                predators[i].display(); 
            }
            prey.update();
            prey.display();
        };          
    }
    if (typeof draw !== 'undefined') processing.draw = draw;
});