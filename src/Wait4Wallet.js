const {Iterator} = require("./utils/Iterator");
const {SilentLogger} = require("./logger/SilentLogger");
const {Clock} = require("./utils/Clock");
const {MnemonicEntropyExtractor} = require("./entropy-extractor/MnemonicEntropyExtractor");
const {MnemonicEntropyDerivator} = require("./entropy-derivator/MnemonicSeedDerivator");
const {MnemonicEntropyCompactor} = require("./entropy-compactor/MnemonicSeedCompactor");
const {XPrvEntropyExtractor} = require("./entropy-extractor/XPrvEntropyExtractor");
const {XPrvEntropyDerivator} = require("./entropy-derivator/XPrvSeedDerivator");
const {XPrvEntropyCompactor} = require("./entropy-compactor/XPrvSeedCompactor");
const {IterationCondition} = require("./condition/IterationCondition");
const {IntervalLogger} = require("./logger/IntervalLogger");
const parseDuration = require("parse-duration");
const {TimeoutCondition} = require("./condition/TimeoutCondition");


class Wait4Wallet {

    constructor(
        entropyExtractor,
        entropyDerivator,
        entropyCompactor
    ) {
        this.entropyExtractor = entropyExtractor,
        this.entropyDerivator = entropyDerivator,
        this.entropyCompactor = entropyCompactor,
        this.logger = new SilentLogger()
        this.iterator = new Iterator()
        this.clock = new Clock()
        this.secretRadix = 36
    }

    static fromMnemonic(language = 'ENG', wordLength = 12, index = 0) {
        const entropyExtractor = new MnemonicEntropyExtractor(language, wordLength, index)
        const entropyDerivator = new MnemonicEntropyDerivator(language, wordLength, index)
        const entropyCompactor = new MnemonicEntropyCompactor(language, wordLength, index)
        return new Wait4Wallet(entropyExtractor, entropyDerivator, entropyCompactor)
    }

    static fromPrivateKey(index = 0) {
        const entropyExtractor = new XPrvEntropyExtractor(index)
        const entropyDerivator = new XPrvEntropyDerivator(index)
        const entropyCompactor = new XPrvEntropyCompactor(index)
        return new Wait4Wallet(entropyExtractor, entropyDerivator, entropyCompactor)
    }

    withSecret(secret) {
        const maxIterations = Number.parseInt(secret, 36)
        this.condition = new IterationCondition(this.iterator, maxIterations)
        this.logger = IntervalLogger.iterationProgressionLogger(1000, this.iterator, maxIterations)
        return this
    }

    withDelay(duration) {
        const timeoutMs = parseDuration(duration)
        this.condition = new TimeoutCondition(this.clock, timeoutMs)
        this.logger = IntervalLogger.timeProgressionLogger(1000, this.clock, timeoutMs)
        return this
    }

    noLogs() {
        this.logger = new SilentLogger()
        return this
    }

    run(input) {
        let entropy = this.entropyExtractor.extract(input)
        this.iterator.init()
        this.condition.init()
        this.logger.before()
        while (this.condition.shouldContinue()) {
            entropy = this.entropyDerivator.derivate(entropy)
            this.iterator.iterate()
            this.logger.log()
        }
        this.logger.after()
        return this.entropyCompactor.compact(entropy)
    }

    get secret() {
        return this.iterator.counter.toString(this.secretRadix)
    }
}

module.exports = {Wait4Wallet}
