const {BIP85} = require("bip85");
const {EntropyCompactor} = require("./EntropyCompactor");
const {LANGUAGES} = require("../models");


class MnemonicEntropyCompactor extends EntropyCompactor {
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

    compact(entropy) {
        return BIP85
            .fromEntropy(entropy)
            .deriveBIP39(LANGUAGES[this.language], this.wordLength, this.index)
            .toMnemonic()
    }
}

module.exports = {MnemonicEntropyCompactor}
