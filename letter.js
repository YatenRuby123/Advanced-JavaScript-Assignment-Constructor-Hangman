function Letter(letter) {
    this.letter = letter;
    if (this.letter == '') {
        this.show = true;
    } else {
        this.show = false;
    }
}
Letter.prototype.printInfo = function() {
    if (this.show) {
        return this.letter + ' ';
    } else {
        return '_ ';
    }
};

module.exports = {
    Letter
}