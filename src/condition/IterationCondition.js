const {Condition} = require("./Condition");

class IterationCondition extends Condition {

    constructor(iterator, maxIteration) {
        super()
        this.iterator = iterator
        this.maxIteration = maxIteration
    }

    init() {
        this.iterator.init()
    }

    shouldContinue() {
        return this.iterator.counter < this.maxIteration
    }
}


module.exports = {IterationCondition}
