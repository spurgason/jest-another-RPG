const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;


    Game.prototype.initializeGame = function () {

        // enemies
        this.enemies.push(new Enemy('goblin', 'sword'));
        this.enemies.push(new Enemy('orc', 'axe'));
        this.enemies.push(new Enemy('skeleton', 'bow'));

        this.currentEnemy = this.enemies[0];

        // asks players name
        inquirer
            .prompt({
                type: 'text',
                name: 'name',
                message: 'What is your name?'
            }).then(({ name }) => {
                this.player = new Player(name);
                this.startNewBattle()
            })
    };

    Game.prototype.startNewBattle = function () {

        // character with highest agility goes first
        if (this.player.agility > this.currentEnemy.agility) {
            this.isPlayerTurn = true;
        } else {
            this.isPlayerTurn = false;
        }

        // displays stats at the start of the game
        console.log('Your stats are as follows:');
        console.table(this.player.getStats());
        console.log(this.currentEnemy.getDescription());

        this.battle()
    };

    Game.prototype.battle = function () {

        // prompts players on which action they would like to take 'Attack' || 'Use Potion' with inquire paths depending on what they choose
        if (this.isPlayerTurn) {
            inquirer
                .prompt({
                    type: 'list',
                    message: 'What would you like to do?',
                    name: 'action',
                    choices: ['Attack', 'Use potion']
                })
                .then(({ action }) => {
                    if (action === 'Use potion') {
                        if (!this.player.getInventory()) {
                            console.log("You dont have any potions!");

                            return this.checkEndOfBattle();
                        }
                        inquirer
                            .prompt({
                                type: 'list',
                                message: 'Which potion would you like to use?',
                                name: 'action',
                                choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                            })
                            .then(({ action }) => {
                                const potionDetails = action.split(': ');

                                this.player.usePotion(potionDetails[0] - 1);
                                console.log(`You used a ${potionDetails[1]} potion.`);

                                return this.checkEndOfBattle();
                            });

                    } else {
                        const damage = this.player.getAttackValue();
                        this.currentEnemy.reduceHealth(damage);

                        console.log(`You attacked the ${this.currentEnemy.name}`);
                        console.log(this.currentEnemy.getHealth());

                        return this.checkEndOfBattle();
                    }
                });

        } else {
            const damage = this.currentEnemy.getAttackValue();
            this.player.reduceHealth(damage);

            console.log(`You were attacked by the ${this.currentEnemy.name}`);
            console.log(this.player.getHealth());

            return this.checkEndOfBattle();
        }
    };

    Game.prototype.checkEndOfBattle = function () {

        // this sets the guidlines of what happens at the end of a battle round depending on the state of the game
        if (this.player.isAlive() && this.currentEnemy.isAlive()) {
            this.isPlayerTurn = !this.isPlayerTurn
            this.battle();
        }
        else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
            console.log(`You've defeated the ${this.currentEnemy.name}`);

            this.player.addPotion(this.currentEnemy.potion);
            console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);

            this.roundNumber++;

            if (this.roundNumber < this.enemies.length) {
                this.currentEnemy = this.enemies[this.roundNumber];
                this.startNewBattle();
            } else {
                console.log('You win!');
            }
        }
        else {
            console.log('You have been defeated');
        }
    };
}

module.exports = Game;
