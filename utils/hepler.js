const namehash = require("eth-ens-namehash");
const sha3 = require("web3-utils").sha3;
const toBN = require("web3-utils").toBN;

const SALT = sha3("foo");

//console.log(SALT)

// node => namehash
console.log(namehash.hash("ela"))

// id => sha3
console.log(sha3("deloplen"));
