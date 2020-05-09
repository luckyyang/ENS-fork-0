const data = require("./Alexa_top_3000_full");
const ETHRegistrarController = artifacts.require("ETHRegistrarController");
const crypto = require("crypto");
const async = require("async");

let result = [];

data.map((domainObj) => {
  let subdomain = domainObj.domain.split(".")[0];
  result.push(subdomain);
});

domains = result.filter((item, index, arr) => arr.indexOf(item, 0) === index);

function randomSecret() {
  return "0x" + crypto.randomBytes(32).toString("hex");
}

const tenYear = 315569520;
const owner = "0x7535D5d1f792808C43eFf07b93CB5A1418284283";
let counter = 0;

module.exports = async function () {
  const controller = await ETHRegistrarController.at(
    "0x061B0251686271522fF4cD100514A61096F27227"
  );

  const reg = async (name) => {
    try {
      let secret = randomSecret();
      let commitment = await controller.makeCommitment(name, owner, secret);
      let tx = await controller.commit(commitment, { from: owner });
      await controller.register(name, owner, tenYear, secret);
      console.log(counter++ + " " + name + " regstered.");
    } catch (e) {
      console.log(e);
    }
  };

  async.mapLimit(
    domains,
    60,
    async function (domain) {
      let isAvailable = await controller.available(domain.toString());
      console.log(isAvailable);
      //await reg(domain.toString());
    },
    (err, results) => {
      if (err) throw err;
      // results is now an array of the response bodies
      console.log(results);
    }
  );
};
