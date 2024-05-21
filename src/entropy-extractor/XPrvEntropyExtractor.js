const {EntropyExtractor} = require("./EntropyExtractor")
const {BIP85} = require("bip85")

class XPrvEntropyExtractor extends EntropyExtractor {
    constructor(index) {
        super()
        this.index = index
    }

    extract(xprv) {
        return BIP85
            .fromBase58(xprv)
            .deriveXPRV(this.index)
            .toEntropy()
    }
}

module.exports = {XPrvEntropyExtractor}
