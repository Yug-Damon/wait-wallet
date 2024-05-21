const chalk = require("chalk")

function paintBash(str) {
    return chalk.whiteBright(chalk.bgBlack(str))
}

function paintKey(str) {
    if(str.startsWith('xpub')) {
        return chalk.dim(chalk.blueBright('xpub')) + chalk.blue(str.replace('xpub', ''))
    }
    if(str.startsWith('xprv')) {
        return chalk.dim(chalk.redBright('xprv')) + chalk.red(str.replace('xprv', ''))
    }
    throw 'Not a valid key'
}

function paintMnemonic(str) {
    return chalk.yellowBright(str)
}


module.exports = {
    paintMnemonic,
    paintKey,
    paintBash
}
