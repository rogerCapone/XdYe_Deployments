const XdYeToken = artifacts.require("XdYeToken.sol");
const MasterChef = artifacts.require("MasterChef.sol");

module.exports = async function (deployer, _network, addresses) {
  const [admin, _] = addresses;

  await deployer.deploy(XdYeToken);
  const xdyeToken = await XdYeToken.deployed();
  
  const startBlock = 0; 
  const endBlock =  1659218400;

  await deployer.deploy(
    MasterChef,
    xdyeToken.address, 
    admin,
    web3.utils.toWei("100"),
    startBlock,
    endBlock
  );

  const masterChef = await MasterChef.deployed();
  
}
