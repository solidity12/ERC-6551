require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [{
      version: "0.8.9",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }, ],
  },
  networks: {
    hardhat: {
      forking: {
        url : "https://api.wemix.com",
      }
    },
  },
};
