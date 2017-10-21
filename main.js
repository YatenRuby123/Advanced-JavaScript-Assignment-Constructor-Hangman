var game = require('./game.js');
var word = require('./word.js');
var letter = require('./letter.js');
var inquirer = require('inquirer');

function guess() {
    console.log(newWord.print());
    inquirer.prompt([{
        name: 'letter',
        type: 'text',
        message: 'Enter a letter:',
        validate: function(str) {
            var regEx = new RegExp("^[a-zA-Z\s]{1,1}$");
            if (regEx.test(str)) {
                return true;
            } else {
                console.log('\nOops. You must guess a single letter.');
                return false;
            }
        }
    }]).then(function(user) {
        console.log('-----------------');
        var letter = user.letter;
        newWord.checkLetter(letter);
        if (newWord.hasLetterBeenGuessed) {
            console.log('Oops! You already guessed that letter!');
            guess();
        } else {
            if (newWord.isComplete()) {
                console.log('Yes! It was ' + newWord.chosenWord + '!');
                console.log('You win!');
                playAgain();
            } else if (newWord.lives === 0) {
                console.log('Ah man, you are out of lives! Try again! The anser was ' + newWord.chosenWord);
                playAgain();
            } else {
                console.log('You have ' + newWord.lives + ' lives left.');
                guess();
            }
        }
    });
}

function playAgain() {
    inquirer.prompt([{
        type: 'list',
        message: 'Do you want to play again?',
        name: 'playAgain',
        choices: ['yes', 'no']
    }]).then(function(user) {
        var answer = user.playAgain;
        if (answer === 'yes') {
            game.userPrompt(function() {
                newWord = new word.Word(game.chosenWord);
                guess();
            });
        } else {
            console.log('Ok, thanks for playing!');
            return;
        }
    });
}

game.userPrompt(function() {
    newWord = new word.Word(game.chosenWord);
    guess();
});