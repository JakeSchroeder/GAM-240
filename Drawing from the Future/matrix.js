//random kanji letters I found online
const letters = ["こ", "れ", "は", "ク", "ッ", "キ", "ー", "で", "す",]

//some nice es6 syntatical sugar for a new object
class Matrix {
    constructor({ i, k, numCols, numRows }) {
        //create number along axis that is width of screen
        this.x = width / numCols * i;
        //place it above the viewport TODO check if square
        this.y = height / numRows / .65 * k;
        //picks a random letter from the kanji list
        this.letter = random(letters);
        //start off black;
        this.alpha = 0;
    }

    //method to show the matrix letter
    display(alpha) {
        //check if value in sketch has alpha of 1
        if (alpha === 1) {
            this.alpha = 1;
            //grabs the random letter
            this.letter = random(letters);
        }
        else {
            //decrement the opacity over time
            this.alpha -= .05;
            //if alpha goes negative set back to random value
            if (this.alpha <= 0) {
                this.alpha = random(0, .45);
            }
        }
        //check to see if the alpha is a radnom float, if so switch the letter
        //this adds some nice self writing feeling
        if (this.alpha >= random(.65, 1)) {
            this.letter = random(letters);
        }
        //derive a rgb value from the alpha and add some padding to get a green hue
        let colorGradient = int(120 * (this.alpha + .05));
        //set fill with rgba string interpolation
        fill(`rgba(${colorGradient},255,${colorGradient},${this.alpha})`);
        textAlign(CENTER, CENTER);
        textSize(16);
        //actually render the text
        text(this.letter, this.x, this.y);
    }

}