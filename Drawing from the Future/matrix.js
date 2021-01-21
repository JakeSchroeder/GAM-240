//random kanji letters I found online
const letters = ["こ", "れ", "は", "ク", "ッ", "キ", "ー", "で", "す",]

//some nice es6 syntatical sugar for a new object
class Matrix {
    constructor({ i, k, numCols, numRows }) {
        //create position along x axis that is width of screen divided by col amount
        this.x = width / numCols * i;
        //create position along y axis that is width of screen divided by rows amount
        this.y = height / numRows / .65 * k;
        //picks a random letter from the kanji list
        this.letter = random(letters);
        //start the letters completely transparent
        this.alpha = 0;
    }

    //method to render the matrix letter which takes in a alpha argument
    display(alpha) {
        //check if value in sketch has alpha of 1
        if (alpha === 1) {
            //set the private intance var to 1
            this.alpha = 1;
            //grabs the random letter
            this.letter = random(letters);
        }
        else {
            //decrement the opacity over time
            this.alpha -= .02;
            //if alpha goes negative set back to random value
            if (this.alpha <= 0) {
                this.alpha = random(0, .45);
            }
        }
        //check to see if the alpha is a radnom float, if so switch the letter
        //this adds the nice self writing feeling
        if (this.alpha >= random(.65, 1)) {
            this.letter = random(letters);
        }
        //derive a rgb value from the alpha and add some padding to get a green hue
        let colorGradient = int(120 * (this.alpha + .05));
        //set fill with rgba string interpolation thats why we need the ` characters
        fill(`rgba(${colorGradient},255,${colorGradient},${this.alpha})`);
        //simply justifies the text center instead of left
        textAlign(CENTER, CENTER);
        //sets the size to 16 pixels
        textSize(16);
        //actually render the text to the canvas
        text(this.letter, this.x, this.y);
    }

}