var Letter = require('./letter.js');

var Word = function(chosenWord) {
    this.lives = 7;
    this.chosenWord = chosenWord;
    this.letters = [];
    this.allGuesses = [];

    for (var i = 0; i < this.chosenWord.length; i++) {
        this.letters.push(new Letter.Letter(this.chosenWord[i]));
    }
};

Word.prototype.checkLetter = function(letter) {
    this.incorrect = true;
    this.hasLetterBeenGuessed = false;
    var letter = letter.toLowerCase();

    if (this.allGuesses.indexOf(letter) != -1) {
        this.hasLetterBeenGuessed = true;
    } else {
        this.allGuesses.push(letter);
        for (var i = 0; i < this.letters.length; i++) {

            if (this.letters[i].letter.toLowerCase() == letter) {
                this.incorrect = false;
                this.letters[i].show = true;
            }
        }

        if (this.incorrect) {
            this.lives--;
        }
    }
};

Word.prototype.isComplete = function() {
    for (var i = 0; i < this.letters.length; i++) {

        if (!this.letters[i].show) {
            return false;
        }
    }
    return true;
};

Word.prototype.print = function() {
    var output = "";

    for (var i = 0; i < this.letters.length; i++) {
        output += this.letters[i].printInfo();
    }
    return output;
};

module.exports = {
    Word
};