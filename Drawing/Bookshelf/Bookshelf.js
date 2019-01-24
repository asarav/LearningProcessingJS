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
        var books = [{
            title: "The Giver",
            stars: 4,
            author: "Some Guy",
            color: color(0, 17, 255)
        }, {
            title: "Crime and Punishment",
            stars: 5,
            author: "Fyodor Dostoyevsky",
            color: color(94, 255, 0)
        }, {
            title: "Harry Potter and the Sorceror's Stone",
            stars: 3,
            author: "J. K. Rowling",
            color: color(255, 0, 0)
        }, {
            title: "Cat in the Hat",
            stars: 4,
            author: "Dr. Seuss",
            color: color(123, 0, 255)
        }, {
            title: "Some book",
            stars: 1,
            author: "Someone",
            color: color(255, 0, 0)
        }, {
            title: "Book",
            stars: 1,
            author: "Someone",
            color: color(255, 0, 0)
        },
        {
            title: "Dictionary",
            stars: 1,
            author: "Dictionary Man",
            color: color(255, 0, 0)
        }];
    
        var bookXPosDistance = 120;
        for(var x = 0; x < books.length; x++) {
            if(x%3 === 0) {
                // draw shelf
                fill(173, 117, 33);
                rect(0, 120 + floor(x/3) * 130, width, 10);
            }
        
            // draw one book
            fill(books[x].color);
            rect(10 + (x%3) * bookXPosDistance, 20 + floor(x/3) * 130, 105, 100);
            
            //Text
            fill(0, 0, 0);
            textSize(10);
            text(books[x].title, 15 + (x%3) * bookXPosDistance , 29  + floor(x/3) * 130, 70, 100);
            text(books[x].author, 15 + (x%3) * bookXPosDistance, 78 + floor(x/3) * 130, 70, 100);
            
            //Draw stars
            for (var i = 0; i < books[x].stars; i++) {
                image(getImage("cute/Star"), 13 + (x%3) * bookXPosDistance + i * 20, 90  + floor(x/3) * 130, 20, 30);
            }
        }    
    }
    if (typeof draw !== 'undefined') processing.draw = draw;
});