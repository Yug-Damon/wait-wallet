const {EntropyExtractor} = require("./EntropyExtractor");
const {BIP85} = require("bip85");
const bip39 = require("bip39");
const {LANGUAGES} = require("../models");

class MnemonicEntropyExtractor extends EntropyExtractor {

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

    extract(mnemonic) {
        return BIP85
            .fromMnemonic(mnemonic)
            .deriveBIP39(LANGUAGES[this.language], this.wordLength, this.index)
            .toEntropy()
    }
}

module.exports = {MnemonicEntropyExtractor}
