const {Logger} = require("./Logger");
const chalk = require("chalk");
const humanizeDuration = require("humanize-duration");
humanizeDuration.round = true


class TimeLogger extends Logger {
    constructor(clock, maxMs) {
        super()
        this.clock = clock
        this.maxMs = maxMs
    }

    before() {
        console.info('• Processing')
        console.info(chalk.yellowBright('0%') + '\tStarting...')
    }

    log() {
        const timeLeftMs = this.maxMs - this.clock.spent
        const percentage = Math.floor(this.clock.spent*100/this.maxMs)
        console.info(chalk.yellowBright(percentage + '%') + '\t' + humanizeDuration(timeLeftMs) + ' left ')
    }

    after() {
        console.info(chalk.yellowBright('100%') + '\tCompleted.')

    }
}

module.exports = {TimeLogger}
