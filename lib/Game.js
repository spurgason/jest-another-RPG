const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [],
        this.currentEnemy;
    this.player;
}

Game.prototype.initializeGame = function () {

    // enemies
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'axe'));
    this.enemies.push(new Enemy('skeleton', 'bow'));

    this.currentEnemy = this.enemies[0];
    
    inquirer
    .prompt({
        type: 'text',
        name: 'name',
        message: 'What is your name?'
    }).then(({name}) => {
        this.player = new Player(name);
        console.log(this.startNewBattle());
    })
};

module.exports = Game;
