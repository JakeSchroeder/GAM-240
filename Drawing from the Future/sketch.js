
//when analyzing the prompt for this project I got extremely excited.
//I read "images from the future" and instantly thought of AI (a very prominent force in today's media)
//I started to think about the future of computers and how sentient machines have been depicted in history.
//Matrix is unquestionably one of the greates depictions of AI and therefore I had to give the well known code screen a try.
//I am a software engineer for my day job so I figured why not draw on some of my OOP experience and use some cool JS classes.
//I also decided to go overboard with optimization which resulted in less features but a rather fast script.
//Overall I am really excited about the final outcome even though it does not fufill the project exactly. 
//I tried adding in various shapes however I felt it ruined the simplicity of the design/interaction.
//Thanks for viewing!
//Jake Schroeder


//actual container of stacked matrix code
let columns = [];
//scale factor that loops are derived from
let numCols;
let numRows;
//container of items to represent first/white characters
let heads = [];
//mapped to first/white characters to control speed
let headSpeeds = [];
//frame counter to keep track of head speed
let headFrameCounter = [];


//p5 method invoked on start
function setup() {
    //set global framerate for canvas
    frameRate(14);
    //set size of canvas to 825 for best viewing experience
    createCanvas(innerWidth, windowHeight);
    //how many columns/rows of matrix grid
    numCols = 80;
    numRows = 90;
    //create nested loop to create grid of matrix on start
    for (let i = 0; i < numCols; i++) {
        let column = [];
        for (let k = 0; k < numRows; k++) {
            column.push(new Matrix({ i, k, numCols, numRows }));
        }
        columns.push(column);
    }
    //intialize heads arrs to empty finite value to match numCols 
    heads = Array(numCols);
    headSpeeds = Array(numCols);
    headFrameCounter = Array(numCols);
    //initialize head values on start with rand nums to be updated in draw loop
    for (let i = 0; i < heads.length; i++) {
        heads[i] = int(random(0, numRows));
        headSpeeds[i] = int(random(1, 5));
        headFrameCounter[i] = headSpeeds[i];
    }
}

//runs the frameRate every second (in this case 12)
function draw() {
    //sets the canvas bg to black
    background(0, 0, 0);
    //create a nested loop to access the matrix objects and set the animation state
    for (let i = 0; i < numCols; i++) {
        //decrement the headFrameCounter for each matrix column
        headFrameCounter[i]--;
        //check to see if the value is neg if so, increase the head and reset the counter
        if (headFrameCounter[i] <= 0) {
            heads[i]++;
            headFrameCounter[i] = headSpeeds[i];
        }
        //check to see which item the head is on and if its larger than the amount rows reset it to 0
        if (heads[i] >= numRows) {
            heads[i] = 0;
        }
        //create a nested forloop to run for every row that gives access to the 2d array
        for (let k = 0; k < numRows; k++) {

            let matrix = columns[i][k];

            //check to see if the head value is the current row and if it is then toggle the alpha
            if (heads[i] === k) {
                matrix.display(1);
            } else {
                matrix.display(0);
            }
            //simple flag to toggle on virus mode 0_o
            if (mouseIsPressed) {
                let x = matrix.x;
                let y = matrix.y;
                //some fun pythagorean theorem to calculate distance offset
                let dist = sqrt((mouseX - x) * (mouseX - x) + (mouseY - y) * (mouseY - y))
                //create a lerped value for managin the size of the cirlce
                let constrainAmount = constrain(dist / (height / 4), 0, 1);
                //set the current matrix's alpha to a sloped value adjusting for the virus effect 
                matrix.alpha = lerp(random(0.3, 1), matrix.alpha, constrainAmount);
                matrix.alpha += random(0, 0.1);
            }

            if (random(0, 1) < .3 && matrix.alpha > 0.93) {
                matrix.alpha = 1;
                let direction = 1 - 2 * int(random(0, 2));
                if (k + 1 < numRows - 1 && i + 1 < numCols && i - 1 > 1) {
                    columns[i + direction][k + 1].alpha = 1;
                }
            }

        }
    }

}

