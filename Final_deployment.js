const Factory = artifacts.require("uniswapv2/UniswapV2Factory.sol");
const Router = artifacts.require("uniswapv2/UniswapV2Router02.sol");
const WETH = artifacts.require("WETH.sol");
const XdYeToken = artifacts.require("XdYeToken.sol");
const MasterChef = artifacts.require("MasterChef.sol");
const XdYeBar = artifacts.require("XdYeBar.sol");
const XdYeMaker = artifacts.require("XdYeMaker.sol");
const PoolUnlockerXdye = artifacts.require("PoolUnlockerXdye.sol");
const FarmUnlockerXdyeEth = artifacts.require("FarmUnlockerXdyeEth.sol");
const FarmUnlockerAEth = artifacts.require("FarmUnlockerAEth.sol");
const FarmUnlockerBEth = artifacts.require("FarmUnlockerBEth.sol");
const ERC2OCreator = artifacts.require("ERC20Creator.sol");
const ERC2OCreator1 = artifacts.require("ERC20Creator1.sol");


module.exports = async function (deployer, _network, addresses) {
  const [admin, _] = addresses;

  await deployer.deploy(WETH);
  const weth = await WETH.deployed();

  await deployer.deploy(ERC2OCreator, 1000000);
  const tokenA = await ERC2OCreator.deployed();
  await deployer.deploy(ERC2OCreator1, 1000000);
  const tokenB = await ERC2OCreator1.deployed();

  await deployer.deploy(Factory, admin);
  const factory = await Factory.deployed();

  await deployer.deploy(Router, factory.address, weth.address);
  const router = await Router.deployed();

  await deployer.deploy(XdYeToken);
  const xdyeToken = await XdYeToken.deployed();

  const startBlock = 1651184573; //? Start Block to start mint XDYE
  const endBonusBlock = 1651184573; //? End Block when BONUS_PERIOD ends for XDYE
  const xdyeMintedPerBlock = web3.utils.toWei("100");

  await deployer.deploy(
    MasterChef,
    xdyeToken.address,
    admin,
    xdyeMintedPerBlock,
    startBlock,
    endBonusBlock
  );
  const masterChef = await MasterChef.deployed();
  
  //? We transfer Ownership so MasterChef has now XDYE mint control
  await xdyeToken.transferOwnership(masterChef.address);

  await deployer.deploy(XdYeBar, xdyeToken.address); 
  const xdyeBar = await XdYeBar.deployed();

  await deployer.deploy(
    XdYeMaker,
    factory.address,
    xdyeBar.address,
    xdyeToken.address, 
    weth.address
  );
  const XdYeMaker = await XdYeMaker.deployed();

  await deployer.deploy(PoolUnlockerXdye, admin);
  const PoolUnlockerXdye = await PoolUnlockerXdye.deployed();

  await deployer.deploy(FarmUnlockerXdyeEth, admin);
  const FarmUnlockerXdyeEth = await FarmUnlockerXdyeEth.deployed();

  await deployer.deploy(FarmUnlockerAEth, admin);
  const FarmUnlockerAEth = await FarmUnlockerAEth.deployed();

  await deployer.deploy(FarmUnlockerBEth, admin);
  const FarmUnlockerBEth = await FarmUnlockerBEth.deployed();

  //? We change where does Factory Contract send the generated rewards from Tx Fees to XdYe Maker
  await factory.setFeeTo(XdYeMaker.address);
  
  console.log('Good luck you now have your own DEX! 🎉🎉');
};
