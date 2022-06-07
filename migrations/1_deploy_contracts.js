//const Migrations = artifacts.require("Migrations");
var NFTContract = artifacts.require("NFTContract");
var MarketPlaceContract = artifacts.require("MarketPlaceContract");

module.exports = async function (deployer) {
  await deployer.deploy(MarketPlaceContract);
  const marketplace = await MarketPlaceContract.deployed();
  await deployer.deploy(NFTContract, marketplace.address);
};