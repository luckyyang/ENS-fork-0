const namehash = require("eth-ens-namehash");
const sha3 = require("web3-utils").sha3;
const toBN = require("web3-utils").toBN;

const SALT = sha3("foo");

//console.log(SALT)

// node => namehash
console.log(namehash.hash("nakadaole.ela"))

// id => sha3
 console.log(sha3("addr"));
//0x0000000000000000000000000000000000000000000000000000000000000000
//0x4ef059036DEB6131bde9ceBdA74A0A9E792c2889