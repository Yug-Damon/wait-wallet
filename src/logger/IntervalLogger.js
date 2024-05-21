const {Logger} = require("./Logger");
const {TimeLogger} = require("./TimeLogger");
const {IteratorLogger} = require("./IterationLogger");


class IntervalLogger extends Logger {

    static iterationProgressionLogger(intervalMs, iterator, iterations) {
        return new IntervalLogger(intervalMs, new IteratorLogger(iterator, iterations))
    }

    static timeProgressionLogger(intervalMs, clock, maxMs) {
        return new IntervalLogger(intervalMs, new TimeLogger(clock, maxMs))
    }

    constructor(intervalMs, logger) {
        super()
        this.intervalMs = intervalMs
        this.logger = logger
    }

    before() {
        this.logger.before();
    }

    log() {
        if(this.lastOutputLog === undefined) this.lastOutputLog = performance.now()

        const now = performance.now()
        if((now - this.lastOutputLog) > this.intervalMs) {
            this.logger.log()
            this.lastOutputLog = now
        }
    }

    after() {
        this.logger.after();
    }
}

module.exports = {IntervalLogger}
