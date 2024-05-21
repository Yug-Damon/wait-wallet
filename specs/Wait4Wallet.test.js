const {expect} = require('chai')
const {Wait4Wallet} = require("../src/Wait4Wallet");
const bip39 = require("bip39")
const bip32Lib = require("bip32");
const ecc = require("tiny-secp256k1");

describe('WaitWallet', function() {

    it('Should be able to derive a delayed mnemonic and access it via the secret', () => {
        const initialMnemnic = bip39.generateMnemonic()

        const timeoutWallet = Wait4Wallet
            .fromMnemonic()
            .withDelay('100ms')
            .noLogs()

        const mnemonic1 = timeoutWallet.run(initialMnemnic)

        const iterationWallet = Wait4Wallet
            .fromMnemonic()
            .withSecret(timeoutWallet.secret)
            .noLogs()

        const mnemonic2 = iterationWallet.run(initialMnemnic)

        expect(mnemonic1).to.equal(mnemonic2)
    })

    it('Should be able to derive a delayed xprv and access it via the secret', () => {
        const initialMnemnic = bip39.generateMnemonic()
        const seed = bip39.mnemonicToSeedSync(initialMnemnic)
        const bip32 = bip32Lib.BIP32Factory(ecc)
        const root = bip32.fromSeed(seed)
        const initialXPrv = root.toBase58()

        const timeoutWallet = Wait4Wallet
            .fromPrivateKey()
            .withDelay('100ms')
            .noLogs()

        const xprv1 = timeoutWallet.run(initialXPrv)

        const iterationWallet = Wait4Wallet
            .fromPrivateKey()
            .withSecret(timeoutWallet.secret)
            .noLogs()

        const xprv2 = iterationWallet.run(initialXPrv)

        expect(xprv1).to.equal(xprv2)
    })

})
