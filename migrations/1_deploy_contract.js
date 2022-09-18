const BasicCounter = artifacts.require("BasicCounter");

module.exports = (deployer) => {
    deployer.deploy(BasicCounter);
}