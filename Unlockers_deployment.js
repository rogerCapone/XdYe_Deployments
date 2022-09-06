const PoolUnlockerXdye = artifacts.require("PoolUnlockerXdye.sol");

const FarmUnlockerXdyeEth = artifacts.require("FarmUnlockerXdyeEth.sol");
const FarmUnlockerAEth = artifacts.require("FarmUnlockerAEth.sol");
const FarmUnlockerBEth = artifacts.require("FarmUnlockerBEth.sol");

module.exports = async function (deployer, _network, addresses) {
  const [admin, _] = addresses;

  await deployer.deploy(PoolUnlockerXdye, admin)
  const poolUnlockerXdye = await PoolUnlockerXdye.deployed()

  await deployer.deploy(FarmUnlockerXdyeEth, admin)
  const farmUnlockerXdyeEth = await FarmUnlockerXdyeEth.deployed()
  
  await deployer.deploy(FarmUnlockerAEth, admin)
  const farmUnlockerAEth = await FarmUnlockerAEth.deployed()

  await deployer.deploy(FarmUnlockerBEth, admin)
  const FarmUnlockerBEth = await FarmUnlockerBEth.deployed()

};
