const XdYeToken = artifacts.require("XdYeToken.sol");
const XdYeBar = artifacts.require("XdYeBar.sol");

module.exports = async function (deployer, _network, addresses) {
  const [admin, _] = addresses;

  await deployer.deploy(XdYeToken);
  const xdyeToken = await XdYeToken.deployed();

  await deployer.deploy(XdYeBar, xdyeToken.address); 
  const xdyeBar = await XdYeBar.deployed();
   
   }
