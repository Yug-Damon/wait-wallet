const {Logger} = require("./Logger");


class SilentLogger extends Logger {
    before() {}
    log() {}
    after() {}
}

module.exports = {SilentLogger}
