// Importing required modules
const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("ERC6551", function () {
  let owner, addr1, addr2;
  let nft, registry, account;
  let nftAddress, registryAddress, implementationAddress;
  let accountAddress;
  let chainId, tokenId, salt, initData;

  before(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    // Deploy NFT Contract
    nft = await ethers.deployContract("NFT", []);
    await nft.waitForDeployment();
    nftAddress = await nft.getAddress();

    // Deploy ERC6551Registry Contract
    registry = await ethers.deployContract("ERC6551Registry", []);
    await registry.waitForDeployment();
    registryAddress = await registry.getAddress();

    // Deploy ERC6551Account Contract
    account = await ethers.deployContract("ERC6551Account", []);
    await account.waitForDeployment();
    implementationAddress = await account.getAddress();

    chainId = (await ethers.provider.getNetwork()).chainId;
    tokenId = 1;
    salt = 0; // sample salt
    initData = "0x"; // Initialization data if required
  });

  it("Should mint an NFT token", async function () {
    // Mint an NFT
    await nft.connect(owner).safeMint(owner.address, tokenId);
    expect(await nft.ownerOf(tokenId)).to.equal(owner.address);
  });

  it("Should create ERC6551Account from ERC6551Registry", async function () {
    // Create an ERC6551Account
    await registry.connect(owner).createAccount(
      implementationAddress,
      chainId,
      nftAddress,
      tokenId,
      salt,
      initData
    );

    accountAddress = await registry.connect(owner).account(
      implementationAddress,
      chainId,
      nftAddress,
      tokenId,
      salt
    );

    expect(accountAddress).to.properAddress;
  });

  it("Should executeCall from ERC6551Account", async function () {
    const erc6551Account = await ethers.getContractAt("ERC6551Account", accountAddress);

    // Try to send some ethers
    const to = addr1.address;
    const value = BigInt(10 ** 18); // 1 Ether
    const data = "0x";

    const prevToBalance = await ethers.provider.getBalance(to);

    await erc6551Account.connect(owner).executeCall(to, value, data, { value: value });

    const currToBalance = await ethers.provider.getBalance(to);

    expect(currToBalance).to.equal(prevToBalance + value);
  });
});
