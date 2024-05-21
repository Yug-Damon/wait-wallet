const {Logger} = require("./Logger");
const chalk = require("chalk");
const {Clock} = require("../utils/Clock");
const humanizeDuration = require("humanize-duration");
humanizeDuration.round = true

class IteratorLogger extends Logger {

    constructor(iterator, maxIteration) {
        super()
        this.iterator = iterator
        this.maxIteration = maxIteration
        this.clock = new Clock()
    }

    before() {
        console.info('• Processing')
        console.info(chalk.yellowBright('0%') + '\tStarting...\t' + chalk.dim('0 derivations done'))
        this.clock.reset()
    }

    log() {
        const velocity = this.iterator.counter / this.clock.spent
        const iterationLeft = this.maxIteration - this.iterator.counter
        const timeLeftMs = iterationLeft/velocity

        const percentage = Math.floor(this.iterator.counter*100/this.maxIteration)

        console.info(chalk.yellowBright(percentage + '%') + '\t' + humanizeDuration(timeLeftMs) + ' left\t' + chalk.dim(this.iterator.counter + ' derivations done'))
    }

    after() {
        console.info(chalk.yellowBright('100%') + '\tCompleted.\t' + chalk.dim(this.iterator.counter + ' derivations done'))
    }
}

module.exports = {IteratorLogger}
