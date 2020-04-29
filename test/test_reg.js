const ENS = artifacts.require("ENSRegistry");
const HashRegistrar = artifacts.require("HashRegistrar");
const BaseRegistrar = artifacts.require("BaseRegistrarImplementation");
const PriceOracle = artifacts.require("SimplePriceOracle");
const ETHRegistrarController = artifacts.require("ETHRegistrarController");
const PublicResolver = artifacts.require("OwnedResolver")

const namehash = require('eth-ens-namehash');
const sha3 = require("web3-utils").sha3;

contract('BaseRegistrar', function (accounts) {

  const ELA_LABEL = sha3("ela");

  //0x2cc116761f592ca63b5701189b06827a6d04037c4b7593ff66671455ed5779d2
  const ELA_NODE = namehash.hash("ela");

  const ownerAccount = accounts[0];
  const controllerAccount = accounts[1];
  const registrantAccount = accounts[2];
  const otherAccount = accounts[3];

  const MIN_COMMITMENT_AGE = 60;
  const MAX_COMMITMENT_AGE = 86400;

  let ens;
  let registrar;
  let controller;
  let priceOracle;
  let resolver;

  before(async () => {
    //load ENS Registry before test
    ens = await ENS.new();

    console.log("ens address => " + ens.address)

    hashReg = await HashRegistrar.new(ens.address, ELA_NODE, 1493895600);
    
    registrar = await BaseRegistrar.new(ens.address, hashReg.address, ELA_NODE);

    console.log("BaseRegistrar address => " + ens.address)
    
    priceOracle = await PriceOracle.new(0);

    controller = await ETHRegistrarController.new(registrar.address,priceOracle.address,MIN_COMMITMENT_AGE,MAX_COMMITMENT_AGE);

    console.log("controller address => " + ens.address)

    resolver = await PublicResolver.new();

    await registrar.addController(controller.address, { from: ownerAccount });
    await ens.setSubnodeOwner('0x0',ELA_LABEL, registrar.address);

  })

  it('should allow new registrations', async () => {
		let tx = await registrar.register(sha3("newname"), registrar.address, 86400, {from: controllerAccount});
		let block = await web3.eth.getBlock(tx.receipt.blockHash);
		assert.equal(await ens.owner(namehash.hash("newname.eth")), registrantAccount);
		assert.equal(await registrar.ownerOf(sha3("newname")), registrantAccount);
		assert.equal((await registrar.nameExpires(sha3("newname"))).toNumber(), block.timestamp + 86400);
	});
  
});