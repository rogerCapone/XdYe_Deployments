const Factory = artifacts.require("uniswapv2/UniswapV2Factory.sol");
const Router = artifacts.require("uniswapv2/UniswapV2Router02.sol");
const WETH = artifacts.require("WETH.sol");

module.exports = async function (deployer, _network, addresses) {
  const [admin, _] = addresses;

  await deployer.deploy(WETH);
  const weth = await WETH.deployed();

  await deployer.deploy(Factory, admin);
  const factory = await Factory.deployed();

  await deployer.deploy(Router, Factory.addresse, weth.address);
  const router = await Router.deployed();
  
  }
