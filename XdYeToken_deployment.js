const XdYeToken = artifacts.require("XdYeToken.sol");

module.exports = async function (deployer, _network, addresses) {
  const [admin, _] = addresses;

   await deployer.deploy(XdYeToken);
   const xdye = await XdYeToken.deployed();
}
