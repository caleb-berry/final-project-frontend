// deploy/00_deploy_your_contract.js

const { ethers } = require("hardhat");
const { getContractAddress } = require('@ethersproject/address');

module.exports = async ({ getNamedAccounts, deployments }) => {
  const [owner] = await ethers.getSigners()
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("Portals", {
    from: deployer,
    log: true,
  });
  await deploy("SpaceMiners", {
    from: deployer,
    log: true,
  });
  const transactionCount = await owner.getTransactionCount()
  const gameContractAddress = getContractAddress({
    from: owner.address,
    nonce: transactionCount
  })
  await deploy("Gems", {
    from: deployer,
    args: [gameContractAddress],
    log: true,
  });

  /*
    // Getting a previously deployed contract
    const YourContract = await ethers.getContract("YourContract", deployer);
    await YourContract.setPurpose("Hello");
    //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */
};
module.exports.tags = ["YourContract"];
