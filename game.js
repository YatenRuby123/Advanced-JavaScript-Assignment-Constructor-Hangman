var mdb = require('moviedb')('b976f19297226718991e3cd72bd00c36');
var inquirer = require('inquirer');

function userPrompt(cb) {
    inquirer.prompt([{
        type: 'input',
        message: 'Type in the name of an actor to choose your category.',
        name: 'actor'
    }]).then(function(user) {
        var actor = user.actor;
        getActorId(actor, function(actorID) {
            getMovies(actorID, function() {
                cb();
            });
        });
    });
}

function getActorId(actor, cb) {
    mdb.searchPerson({ query: actor }, function(err, res) {
        if (err) {
            console.log('Oops! An error has occured.');
            return;
        }
        if (res.results.length > 0) {
            var actorID = res.results[0].id;
            cb(actorID);
        } else {
            console.log('Sorry, we couldn\'t find that actor. Try again.');
        }
    });
}

function getMovies(actorID, cb) {
    var moviesArr = [];
    mdb.discoverMovie({ with_cast: actorID }, function(err, res) {
        if (err) {
            console.log('Oops! An error has occured.');
            return;
        }
        var results = res.results;
        for (var i = 0; i < results.length; i++) {
            var title = results[i].title;
            if (/^[a-zA-Z ]*$/g.test(title)) {
                moviesArr.push(title);
            }
        }
        var randomNumber = Math.floor(Math.random() * moviesArr.length);
        randomNumber -= 1;
        var chosenWord = moviesArr[randomNumber];
        module.exports.chosenWord = chosenWord;
        cb();
    });
}

module.exports = {
    userPrompt
};