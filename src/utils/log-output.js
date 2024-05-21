const bip39 = require("bip39");
const bip32Lib = require("bip32");
const ecc = require("tiny-secp256k1");
const chalk = require("chalk");
const bip32 = bip32Lib.BIP32Factory(ecc)
const {paintMnemonic, paintKey, paintBash} = require("./paint");

function getAndLogRoot(waitWalletOutput, options) {

    if (bip39.validateMnemonic(waitWalletOutput)) {
        console.info('\n• Mnemonic :')
        console.info(paintMnemonic(waitWalletOutput))

        const seed = bip39.mnemonicToSeedSync(waitWalletOutput)

        const root = bip32.fromSeed(seed)

        console.info('\n• Master private key :')
        console.info(paintKey(root.toBase58()))

        return root
    } else if (waitWalletOutput.startsWith('xprv')) {
        console.info('\n• Master private key :')
        console.info(paintKey(waitWalletOutput))
        return bip32.fromBase58(waitWalletOutput)
    } else {
        throw 'The provided output is invalid'
    }
}

function logOutput(waitWalletOutput, options) {

    let root = getAndLogRoot(waitWalletOutput, options)

    const xpub = root.neutered().toBase58()
    console.info('\n• Master public key :')
    console.info(paintKey(xpub))

    const legacyPubkey = root
        .deriveHardened(44)
        .deriveHardened(0)
        .deriveHardened(0)
        .neutered()
        .toBase58()

    const segwitPubkey = root
        .deriveHardened(84)
        .deriveHardened(0)
        .deriveHardened(0)
        .neutered()
        .toBase58()

    const taprootPubkey = root
        .deriveHardened(86)
        .deriveHardened(0)
        .deriveHardened(0)
        .neutered()
        .toBase58()

    const multisigPubkey = root
        .deriveHardened(48)
        .deriveHardened(0)
        .deriveHardened(0)
        .deriveHardened(2)
        .neutered()
        .toBase58()

    console.info('\n• BTC Public keys :')
    console.info('Legacy\t\t' + chalk.yellow('m/44\'/0\'/0\'\t'), paintKey(legacyPubkey))
    console.info('Native\t\t' + chalk.yellow('m/84\'/0\'/0\'\t'), paintKey(segwitPubkey))
    console.info('Taproot\t\t' + chalk.yellow('m/86\'/0\'/0\'\t'), paintKey(taprootPubkey))
    console.info('Multisig\t' + chalk.yellow('m/48\'/0\'/0\'/2\'\t'), paintKey(multisigPubkey))
}


module.exports = {logOutput}
