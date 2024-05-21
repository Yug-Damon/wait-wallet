# Wait4Wallet
_Delayed Access Crypto Wallet_

## Presentation

The purpose of this project is to provide a tool to the crypto enthusiats who want to delay the access to their crypto wallet.

In order to generate your delayed access wallet you need to dedicate as much time for the creation than for the access. 

If you want to delay the access to your wallet to about 1 hour, then you need to dedicate 1 hour to build it.

### Building

For a given time amount of time :
```
walletA -> walletB + secret
```
- The wallet A is your backup wallet
- The wallet B is your delayed access wallet
- Keep the generated secret along the backup wallet 

### Accessing
```
walletA + secret -> walletB
```
- For a given hardware, the accessing time should be slightly equal to the time dedicated to build the wallet in the first place.

## Installation

**CLI**

```
npm install -g wait4it
```


**Node.js**

```
npm install wait4it
```


## CLI usage

### Build a delayed access wallet

**From a mnemonic**

```wait4wallet --duration <duration> --mnemonic <mnemonic>```

```bash
$ wait4wallet --duration 1h --mnemonic "protect private life [...]"

0%      1 hour left 
// 1h hour of computation 
100%    Completed.

Mnemonic :
detail error [...] potato

Master private key :
xprv[...]p1v

Master public key :
xpub[...]UFS

Rebuild this wallet in 1 hour with :
wait4wallet --secret o4l --mnemonic "protect private life [...]"
```


**From a xprv**

```wait4wallet --duration <duration> --xprv <xprv>```

```bash
$ wait4wallet --duration 1h --xprv xprv[...]sdj

0%      1 hour left 
// 1h hour of computation 
100%    Completed.

Master private key :
xprv[...]ofd

Master public key :
xpub[...]Wsd

Rebuild this wallet in 1 hour with :
wait4wallet --secret dDg --mnemonic xprv[...]sdj
```


### Access a delayed wallet

**From a mnemonic**

```wait4wallet --secret <secret> --mnemonic <mnemonic>```

```bash
$ wait4wallet --secret dR4 --mnemonic "protect private life [...]"

0%      1 hour left 
// 1h hour of computation 
100%    Completed.

Mnemonic :
detail error [...] potato

Master private key :
xprv[...]p1v

Master public key :
xpub[...]UFS
```


**From a private key**

```wait4wallet access-xprv <secret> <xprv>```


```bash
$ wait4wallet --secret dR4 --xprv xprv[...]1sd

0%      1 hour left 
// 1h hour of computation 
100%    Completed.

Mnemonic :
detail error [...] potato

Master private key :
xprv[...]pl2

Master public key :
xpub[...]Ua4
```


## Programmatic usage
Use this library in your project

### Build

**From Mnemonic**
```javascript
const {Wait4Wallet} = require("wait4wallet")

const wallet = Wait4Wallet
    .fromMnemonic()
    .withDelay('1h')

const newMnemonic = wallet.run('protect private life [...]')
// 1 hour of computation
const secret = wallet.secret
// Fund the wallet & store secret
```

**From private key** 
```javascript
const {Wait4Wallet} = require("wait4wallet")

const wallet = Wait4Wallet
    .fromPrivateKey()
    .withDelay('1h')

const newXprv = wallet.run('xprvsdf[...]poi')
// 1 hour of computation
const secret = wallet.secret
// Fund the wallet & store secret
```

### Access 


**From mnemonic**
```javascript

const {Wait4Wallet} = require("wait4wallet")

const wallet = Wait4Wallet
    .fromMnemonic()
    .withSecret('5tSh')

const newMnemnic = wallet.run('install scatter [...] usage')  // take 1h to perform
// Access your fund
```


**From private key**

```javascript

const {Wait4Wallet} = require("wait4wallet")

const wallet = Wait4Wallet
    .fromPrivateKey()
    .withSecret('5tSh')

const newXprv = wallet.run('xprvstsh[...]nkmt') // take 1h to perform
// Access your fund
```

## Under the hood

The implementation of this tool is dead simple.

For a given amount of time, the tool is looping on BIP85 derivation from an initial wallet, once the time limit is reached, the tool print out the last derivation and the number of iterations associated.

It's then always possible to access this wallet knowing the initial wallet and the iteration count with the required amount of time. 

The secret is this number converted to base 36.


## Don't trust, verify

Because of the cryptographic nature of this project I encourage you to audit the source code if you consider to use it for your own wallets.

https://github.com/Yug-Damon/wait-wallet
