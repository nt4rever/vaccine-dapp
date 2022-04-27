const VaccineContract = artifacts.require("VaccineContract");

module.exports = function (deployer) {
  deployer.deploy(VaccineContract);
};
