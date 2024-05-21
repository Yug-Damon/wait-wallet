#!/usr/bin/env node
const { Command } = require('commander')
const {logOutput} = require("./utils/log-output");
const parseDuration = require("parse-duration");
const chalk = require("chalk");
const humanDuration = require("humanize-duration");
const {paintMnemonic, paintKey, paintBash} = require("./utils/paint");
const {Wait4Wallet} = require("./Wait4Wallet");
const {checkDuration, checkIndex, checkLanguage, checkMnemonic, checkWordLength, checkXprv} = require("./utils/check");
const program = new Command()


program
    .name('wait4wallet')
    .description("The purpose of this project is to provide a tool to the crypto enthusiats who want to delay the access to their crypto wallet.")
    .version('1.0.0')
    .usage('wait4wallet')
    .description('Create a wallet with the specified delay access')
    .option('-d, --duration <string>', 'The duration dedicated to the derivation process')
    .option('-s, --secret <string>', 'The secret to access the delayed wallet')
    .option('-m, --mnemonic <string>', 'The mnemonic from which the derivation will start from')
    .option('-x, --xprv <string>', 'The xprv from which the derivation will start from')
    .option('-i, --index <number>', 'Index used during the bip85 derivations')
    .option('-l, --language <string>', '(with --mnemonic only) The language used to generate the output mnemonic (ENG, JAP, SP, IT, FR, KO, CZ, PT, CH accepted, default: ENG)')
    .option('-w, --wordLength <string>', '(with --mnemonic only) The number of words used in the output mnemonic (12, 18, 24 accepted, default: the number of words in the input mnemonic)')
    .action((options) => {
        try {
            if(options.duration && options.secret) {
                throw Error('--duration and --secret flags cannot be used together')
            }

            if(options.mnemonic && options.xprv) {
                throw Error('--mnemonic and --xprv flags cannot be used together')
            }

            if(options.duration) {
                checkDuration(options.duration)
                const timeoutMs = parseDuration(options.duration)

                if(options.mnemonic) {
                    checkMnemonic(options.mnemonic)
                    checkWordLength(options.wordLength)
                    checkLanguage(options.language)
                    checkIndex(options.index)
                    const mnemonicWordLength = options.mnemonic.split(' ').length
                    const wallet = Wait4Wallet
                        .fromMnemonic(options.language ?? 'ENG', options.wordLength ? Number.parseInt(options.wordLength) : mnemonicWordLength, options.index ? Number.parseInt(options.index) : 0)
                        .withDelay(timeoutMs)

                    const outputMnemonic = wallet.run(options.mnemonic)
                    logOutput(outputMnemonic, options)

                    console.info('\n• Rebuild this wallet in ' + chalk.bold(humanDuration(timeoutMs)) + ' with :')
                    const indexStr = options.index ? ' --index ' + options.index : ''
                    const languageStr = options.language ? ' --language ' + options.language : ''
                    const wordLengthStr = options.index ? ' --wordLength ' + options.wordLength : ''
                    const optionalParameters = indexStr + languageStr + wordLengthStr
                    console.info(paintBash('wait4wallet --secret ' + chalk.greenBright(wallet.secret) + ' --mnemonic "' + paintMnemonic(options.mnemonic) + '"' + chalk.dim(optionalParameters)))
                } else if(options.xprv) {
                    checkXprv(options.xprv)
                    checkIndex(options.index)
                    const wallet = Wait4Wallet
                        .fromPrivateKey(options.index ? Number.parseInt(options.index) : 0)
                        .withDelay(timeoutMs)

                    const outputXprv = wallet.run(options.xprv)
                    logOutput(outputXprv, options)
                    const indexStr = options.index ? ' --index ' + options.index : ''
                    console.info('\n• Rebuild this wallet in ' + chalk.bold(humanDuration(timeoutMs)) + ' with :')
                    console.info(paintBash('wait4wallet --secret ' + chalk.greenBright(wallet.secret) + ' --xprv ' + paintKey(options.xprv) + chalk.dim(indexStr)))
                }
            } else if(options.secret) {
                if(options.mnemonic) {
                    checkMnemonic(options.mnemonic)
                    checkWordLength(options.wordLength)
                    checkLanguage(options.language)
                    checkIndex(options.index)
                    const mnemonicWordLength = options.mnemonic.split(' ').length
                    const wallet = Wait4Wallet
                        .fromMnemonic(options.language ?? 'ENG', options.wordLength ? Number.parseInt(options.wordLength) : mnemonicWordLength, options.index ? Number.parseInt(options.index) : 0)
                        .withSecret(options.secret)

                    const outputMnemonic = wallet.run(options.mnemonic)
                    logOutput(outputMnemonic, options)
                } else if(options.xprv) {
                    checkXprv(options.xprv)
                    checkIndex(options.index)
                    const wallet = Wait4Wallet
                        .fromPrivateKey(options.index ? Number.parseInt(options.index) : 0)
                        .withSecret(options.secret)

                    const outputXprv = wallet.run(options.xprv)
                    logOutput(outputXprv, options)
                }
            } else {
                console.info(chalk.underline('\n\nGenerate a delayed wallet') + ' :')
                console.info(chalk.bold('walletA -> walletB + secret'))
                console.info(chalk.italic('For a given duration and an initial wallet, generate a new wallet that require this duration to be computed.'))
                console.info(chalk.italic('A secret is generated along the new wallet, it must be keeped in order to recover the new wallet.'))

                console.info('\n• From mnemonic :')
                console.info(paintBash('wait4wallet --duration ' + chalk.yellowBright('1h') + ' --mnemonic "' + paintMnemonic('protect private life [...]') + '"' + chalk.dim(' --language ENG --wordList 12 --index 0')))

                console.info('\n• From private key :')
                console.info(paintBash('wait4wallet --duration ' + chalk.yellowBright('1h') + ' --xprv ' + paintKey('xprvstsh[...]nkmt') + chalk.dim(' --index 0')))

                console.info(chalk.underline('\nAccess a delayed wallet') + ' :')
                console.info(chalk.bold('walletA + secret -> walletB'))
                console.info(chalk.italic('For a given secret and an initial wallet, access the delayed wallet.'))

                console.info('\n• From mnemonic :')
                console.info(paintBash('wait4wallet --secret ' + chalk.greenBright('d5tc') + ' --mnemonic "' + paintMnemonic('protect private life [...]') + '"' + chalk.dim(' --language ENG --wordList 12 --index 0')))

                console.info('\n• From private key :')
                console.info(paintBash('wait4wallet --secret ' + chalk.greenBright('d5tc') + ' --xprv ' + paintKey('xprvstsh[...]nkmt') + chalk.dim(' --index 0')))
            }

            console.info(chalk.dim('\nDon\'t trust, verify'))

        } catch(error) {
            return console.error(chalk.redBright('\n' + error.message))
        }
    })

program.parse(process.argv)

