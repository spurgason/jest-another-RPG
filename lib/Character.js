class Character {
  constructor(name = '') {

    this.name = name;

    // assigns character a random value to health, strength, and agility
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
  }

  // checks to see if they are alive
  isAlive() {
    if (this.health === 0) {
      return false;
    }
    return true;
  };

  // gets the health of the character  
  getHealth() {
    return `${this.name}'s health is now ${this.health}!`;
  };

  // gets the attack value to be able to damage other character 
  getAttackValue() {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max - min) + min);
  };

  // reduces health after attack
  reduceHealth(health) {
    this.health -= health;

    if (this.health < 0) {
      this.health = 0;
    }
  };
}

module.exports = Character;