class Potion {
    constructor(name) {
        this.types = ['strength', 'agility', 'health']
        this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

        // sets how much of a certain skill or health is goin to be given depending on what potion is chosen
        if (this.name === 'health') {
            this.value = Math.floor(Math.random() * 10 + 30);
        } else {
            this.value = Math.floor(Math.random() * 5 + 7);
        }
    }
}

module.exports = Potion;