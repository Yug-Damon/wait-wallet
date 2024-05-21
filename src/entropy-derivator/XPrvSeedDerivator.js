const {BIP85} = require("bip85");
const {EntropyDerivator} = require("./EntropyDerivator");


class XPrvEntropyDerivator extends EntropyDerivator {

    constructor(index) {
        super()
        this.index = index
    }

    derivate(entropy) {
        return BIP85
            .fromEntropy(entropy)
            .deriveXPRV(this.index)
            .toEntropy()
    }
}

module.exports = {XPrvEntropyDerivator}
