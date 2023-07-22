// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // Deploy NFT Contract
  const nft = await hre.ethers.deployContract("NFT", []);
  await nft.waitForDeployment();
  console.log("NFT contract deployed to:", await nft.getAddress());

  // Deploy ERC6551Registry Contract
  const registry = await hre.ethers.deployContract("ERC6551Registry", []);
  await registry.waitForDeployment();
  console.log("ERC6551Registry contract deployed to:", await registry.getAddress());

  // Deploy ERC6551Account Contract
  const account = await hre.ethers.deployContract("ERC6551Account", []);
  await account.waitForDeployment();
  console.log("ERC6551Account contract deployed to:", await account.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
