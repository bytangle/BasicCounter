const BasicCounter = artifacts.require("BasicCounter");

module.exports = async (deployer, network, accounts) => {

    deployer.deploy(BasicCounter, {
        from : accounts[2],
        overwrite: false
    }).then(async () => {
        const bc = await BasicCounter.deployed();
        console.log("Address: ", bc.address);
    });
    
}