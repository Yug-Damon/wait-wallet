const {BIP85} = require("bip85");
const {EntropyDerivator} = require("./EntropyDerivator");
const {LANGUAGES} = require("../models");


class MnemonicEntropyDerivator extends EntropyDerivator {
    constructor(
        language,
        wordLength,
        index
    ) {
        super()
        this.language = language
        this.wordLength = wordLength
        this.index = index
    }

    derivate(entropy) {
        return BIP85
            .fromEntropy(entropy)
            .deriveBIP39(LANGUAGES[this.language], this.wordLength, this.index)
            .toEntropy()
    }
}

module.exports = {MnemonicEntropyDerivator}
