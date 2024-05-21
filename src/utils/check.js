const bip39 = require("bip39");
const parseDuration = require("parse-duration");
const {availableWordLength, availableLanguages, LANGUAGES} = require("../models");
const bs58check = require("bs58check");

function checkMnemonic(str) {
    if(bip39.validateMnemonic(str)) return
    throw Error('The provided mnemonic is not a valid')
}

function checkDuration(str) {
    if(str === undefined) return
    if(parseDuration(str)) return
    throw Error('The provided duration is invalid')
}

function checkWordLength(str) {
    if(str === undefined) return
    if(isNaN(str)) throw Error('The provided wordLength is not a number')
    const wordLength = +str
    if(availableWordLength.includes(wordLength)) return
    throw Error('The provided wordlegnth is not supported (12, 18 or 24 accepted)')
}

function checkLanguage(str) {
    if(str === undefined) return
    if(availableLanguages.includes(str)) return
    throw Error('The provided language is not valid (ENG, JAP, SP, IT, FR, KO, CZ, PT, CH accepted)')
}

function checkIndex(str) {
    if(str === undefined) return
    if(isNaN(str)) throw Error('The index is noot a number')
    const n = +str
    if(n < 0) throw Error('The index cannot be negative')
    if(n > 10_000) throw Error('The index cannot be greater than 10000')
    return true
}


function checkXprv(str) {
    try {
        bs58check.decode(str)
    } catch (err) {
        throw Error('The provided xprv is not valid')
    }
}



module.exports = {
    checkMnemonic,
    checkDuration,
    checkWordLength,
    checkLanguage,
    checkIndex,
    checkXprv,
}
