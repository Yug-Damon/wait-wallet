
const LANGUAGES = {
    ENG: 0,
    JAP: 1,
    SP: 2,
    IT: 3,
    FR: 4,
    KO: 5,
    CZ: 6,
    PT: 7,
    CH: 8,
}

const WORDS_LENGTH = {
    SHORT: 12,
    MIDDLE: 18,
    LONG: 24
}

const availableLanguages = ['ENG', 'JAP', 'SP', 'IT', 'FR', 'KO', 'CZ', 'PT', 'CH',]
const availableWordLength = [WORDS_LENGTH.SHORT, WORDS_LENGTH.MIDDLE, WORDS_LENGTH.LONG]

module.exports = {
    LANGUAGES,
    WORDS_LENGTH,
    availableLanguages,
    availableWordLength
}
