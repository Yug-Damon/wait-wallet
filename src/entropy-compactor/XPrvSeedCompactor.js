const {BIP85} = require("bip85");
const {EntropyCompactor} = require("./EntropyCompactor");


class XPrvEntropyCompactor extends EntropyCompactor {

    constructor(index) {
        super()
        this.index = index
    }

    compact(entropy) {
        return BIP85
            .fromEntropy(entropy)
            .deriveXPRV(this.index)
            .toXPRV()
    }
}

module.exports = {XPrvEntropyCompactor}
