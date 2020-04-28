const ENS = artifacts.require("ENSRegistry");
const HashRegistrar = artifacts.require("HashRegistrar");
const BaseRegistrar = artifacts.require("BaseRegistrarImplementation");
const PriceOracle = artifacts.require("SimplePriceOracle");
const ETHRegistrarController = artifacts.require("ETHRegistrarController");
const PublicResolver = artifacts.require("OwnedResolver")

const namehash = require('eth-ens-namehash');
const sha3 = require("web3-utils").sha3;

contract('BaseRegistrar', function (accounts) {

  const ownerAccount = 0x7535D5d1f792808C43eFf07b93CB5A1418284283;
  const ELA_LABEL = sha3("ela");
  const ELA_NODE = namehash.hash("ela");
  const controllerAccount = 0xa2E5B3bb898cFb616E938d6c0a6dFafb967c7cc7;
  const registrantAccount = ownerAccount;
  const otherAccount = ownerAccount;

  const MIN_COMMITMENT_AGE = 60;
  const MAX_COMMITMENT_AGE = 86400;

  let ens;
  let registrar;
  let controller;
  let priceOracle;
  let resolver;

  before(async () => {
    // load ENS Registry before test
    ens = await ENS.new();

    hashReg = await HashRegistrar.new(ens.address,ELA_NODE,1493895600);
    
    registrar = await BaseRegistrar.new(ens.address, hashReg.address, ELA_NODE);
    
    priceOracle = await PriceOracle.new(0);

    controller = await ETHRegistrarController.new(registrar.address,priceOracle.address,MIN_COMMITMENT_AGE,MAX_COMMITMENT_AGE);

    resolver = await PublicResolver.new();

    // await registrar.addController(controller.address, { from: ownerAccount });
    // await ens.setSubnodeOwner('0x0',ELA_LABEL, registrar.address);

  })

  // it('should allow new registrations', async () => {
	// 	var tx = await registrar.register(sha3("newname"), registrantAccount, 86400, {from: controllerAccount});
	// 	var block = await web3.eth.getBlock(tx.receipt.blockHash);
	// 	assert.equal(await ens.owner(namehash.hash("newname.eth")), registrantAccount);
	// 	assert.equal(await registrar.ownerOf(sha3("newname")), registrantAccount);
	// 	assert.equal((await registrar.nameExpires(sha3("newname"))).toNumber(), block.timestamp + 86400);
	// });
  
});