class Clock {
    reset() {
        this.startMs = performance.now()
    }

    get spent() {
        return performance.now() - this.startMs
    }
}

module.exports = {Clock}
