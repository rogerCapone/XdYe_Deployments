const Factory = artifacts.require("uniswapv2/UniswapV2Factory.sol");
const Router = artifacts.require("uniswapv2/UniswapV2Router02.sol");
const WETH = artifacts.require("WETH.sol");
const XdYeToken = artifacts.require("XdYeToken.sol");
const MasterChef = artifacts.require("MasterChef.sol");
const XdYeBar = artifacts.require("XdYeBar.sol");
const XdYeMaker = artifacts.require("XdYeMaker.sol");


module.exports = async function (deployer, _network, addresses) {
  const [admin, _] = addresses;

  await deployer.deploy(WETH);
  const weth = await WETH.deployed();

  await deployer.deploy(Factory, admin);
  const factory = await Factory.deployed();

  await deployer.deploy(Router, factory.address, weth.address);
  const router = await Router.deployed();

  await deployer.deploy(XdYeToken);
  const xdyeToken = await XdYeToken.deployed();

  await deployer.deploy(XdYeBar, xdyeToken.address); 
  const xdyeBar = await XdYeBar.deployed();

  await deployer.deploy(
     XdYeMaker,
     factory.address,
     xdyeBar.address,
     xdyeToken.address, 
     weth.address
   );
  const xdyeMaker = await XdYeMaker.deployed();


  await factory.setFeeTo(xdyeMaker.address) 

};
