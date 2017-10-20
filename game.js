var mdb = require('moviedb')('');
var inquirer = require('inquirer');

function usrPrompt(cb) {
    inquirer.prompt([{
        type: 'input',
        message: 'Type in the name of an actor to choose your category.',
        name: 'actor'
    }]).then(function(user) {
        var actor = user.actor;
        getActorId(actor, function(actorId) {
            getMovies(actorID, function() {
                cd();
            });
        });
    });
}

function getActorId(actor, cb) {
    mdb.searchPerson({ query: actor }, function(err, res) {
        if (err) {
            console.log('Oops An error has occured.');
            return;
        }
        if (res.result.length > 0) {
            var actorID = res.results[0].id;
            cb(actorID);
        } else {
            console.log('Sorry, we couldnt find that actor. Try again.');
        }
    });
}

function getMovies(actorID, cb) {
    var moviesArr = [];
    mdb.discoverMovie({ with_cast: actorId }, function(err, res) {
        if (err) {
            console.log('Oops an error has occured.');
            return;
        }
        var results = res.results;
        for (var i = 0; i < results.length; i++) {
            var title = results[i].title;
            if (/^[a-zA-Z]*$/g.test(title)) {
                moviesArr.push(title);
            }
        }
        var randomNumber = Math.floor(Math.random() * moviesArr.length);
        randomNumber -= 1;
        var chosemWord = moviesArr[randomNumber];
        module.exports.chosemWord = chosemWord;
        cb();
    });
}

module.exports = {
    userPromt
};