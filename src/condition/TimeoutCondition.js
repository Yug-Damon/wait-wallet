const {Condition} = require("./Condition");

class TimeoutCondition extends Condition {

    constructor(clock, timeoutMs) {
        super()
        this.clock = clock
        this.timeoutMs = timeoutMs
    }

    init() {
        this.clock.reset()
    }

    shouldContinue() {
        return this.clock.spent < this.timeoutMs
    }
}


module.exports = {TimeoutCondition}
