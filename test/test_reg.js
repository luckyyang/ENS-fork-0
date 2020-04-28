const ENSRegistry = artifacts.require("ENSRegistry");
const HashRegistrar = artifacts.require("HashRegistrar");
const BaseRegistrar = artifacts.require("BaseRegistrarImplementation");
const PriceOracle = artifacts.require("SimplePriceOracle");
const ETHRegistrarController = artifacts.require("ETHRegistrarController");
const PublicResolver = artifacts.require("OwnedResolver")

const namehash = require('eth-ens-namehash');
const sha3 = require("web3-utils").sha3;

contract('BaseRegistrar', function (accounts) {

  const ownerAccount = 0x0B72867FE6274597A038bE5684c8649ab7355c40;
  const ELA_LABEL = sha3("ela");

  const registrantAccount = ownerAccount;
  const otherAccount = ownerAccount;

  let ens;
  let registrar;
  let controller;

  before(async () => {
    // load ENS Registry before test
    ens = await ENS.at("0x68791737beb542C6e7b02c870D34e65017233EC7");

    registrar = await BaseRegistrar.at("0xefa2ee8aB8881c62390ed1F201301a8c9b1a5C03");

    controller = await ETHRegistrarController.at("0x023d00BAf01336E82953F276Df81dbFE3640F23d");

    await registrar.addController(controller.address, { from: ownerAccount });
    await ens.setSubnodeOwner('0x0', ELA_LABEL, registrar.address);

  })
  
});