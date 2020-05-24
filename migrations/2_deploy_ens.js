const ENSRegistry = artifacts.require("ENSRegistry");
const HashRegistrar = artifacts.require("HashRegistrar");
const BaseRegistrar = artifacts.require("BaseRegistrarImplementation");
const PriceOracle = artifacts.require("SimplePriceOracle");
const ETHRegistrarController = artifacts.require("ETHRegistrarController");
const PublicResolver = artifacts.require("OwnedResolver")
const ReverseRegistrar = artifacts.require("ReverseRegistrar");

// const namehash = require("eth-ens-namehash");
// const sha3 = require("web3-utils").sha3;
// const toBN = require("web3-utils").toBN;

// const DAYS = 24 * 60 * 60;
// const SALT = sha3("foo");
// const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
// //0x2cc116761f592ca63b5701189b06827a6d04037c4b7593ff66671455ed5779d2
// const ELA_LABEL = sha3("ela");
// const ELA_NODE = namehash.hash("ela");
// const MIN_COMMITMENT_AGE = 60;
// const MAX_COMMITMENT_AGE = 86400;

// eploy the old ENS contracts with some sample names.
module.exports = async function (deployer, network, accounts) {

  const ensAddr = "0xbA2ac9347448bfAEF5743E4161DCc95778F596e5"
  const resolverAddr = "0x4ef059036DEB6131bde9ceBdA74A0A9E792c2889";
  
  await deployer.deploy(ReverseRegistrar,ensAddr, resolverAddr, { from: accounts[0] });
  const reverseReg = await ReverseRegistrar.deployed();
  console.log(reverseReg)

  // // Deploy the ENSregistry
  // await deployer.deploy(ENSRegistry, {from: accounts[0]});
  // const ens = await ENSRegistry.deployed();

  // // Deploy the Hashregistry
  // await deployer.deploy(HashRegistrar, ens.address, ELA_NODE, 1493895600);
  // const hashRegistrar = await HashRegistrar.deployed();

  // // Create the original 'permanent' registrar and register some names on it
  // await deployer.deploy(BaseRegistrar, ens.address, hashRegistrar.address, ELA_NODE, { from: accounts[0] });
  // Registrar = await BaseRegistrar.deployed();
  // // await Registrar.addController(accounts[0], { from: accounts[0] });
  
  // // Deploy the price oracle
  // await deployer.deploy(PriceOracle,0,{ from: accounts[0] })
  // const pOracle = await PriceOracle.deployed();

  // // Deploy the controller
  // await deployer.deploy(ETHRegistrarController,Registrar.address,pOracle.address,MIN_COMMITMENT_AGE,MAX_COMMITMENT_AGE,{ from: accounts[0] })
  // const Controller = await ETHRegistrarController.deployed();

  // // Deploy the Resolver
  // await deployer.deploy(PublicResolver,{ from: accounts[0] })
  // const Resolver = await PublicResolver.deployed();

  // await Registrar.addController(accounts[0], {from: accounts[0]});
  // await ens.setSubnodeOwner(ZERO_ADDRESS, ELA_LABEL, Registrar.address, { from: accounts[0] });
  // await Registrar.register(sha3("migrated"),accounts[0],86400,{from:accounts[0]})
}