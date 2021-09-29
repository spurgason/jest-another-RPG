const Potion = require('./Potion');
const Character = require('./Character');

class Enemy extends Character {
    constructor(name, weapon) {

        // passes name argument to Character.js
        super(name);

        // what weapon and potion enemy has
        this.weapon = weapon;
        this.potion = new Potion()

    }

    // gives a discription of enemy
    getDescription() {
        return `A ${this.name} holding a ${this.weapon} has appeared!`
    }
};

module.exports = Enemy;
