const Factory = artifacts.require("uniswapv2/UniswapV2Factory.sol");

module.exports = async function (deployer, _network, addresses) {
  const [admin, _] = addresses;

  await deployer.deploy(Factory, admin);
  const factory = await Factory.deployed();
  
}
