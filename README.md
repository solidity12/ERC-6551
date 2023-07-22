# ERC6551 Token Bound Account System

This repository contains the implementation of the ERC6551 Token Bound Account System, a novel system for ERC-721 tokens that allows each ERC-721 token to own assets and interact with applications, without requiring changes to existing ERC-721 smart contracts or infrastructure.

For more information about ERC6551, please refer to the official Ethereum Improvement Proposals (EIPs) site: [https://eips.ethereum.org/EIPS/eip-6551](https://eips.ethereum.org/EIPS/eip-6551)

## Introduction

ERC-721 tokens, also known as Non-Fungible Tokens (NFTs), are unique tokens that represent ownership of a specific item or asset on the blockchain. However, these tokens typically lack the ability to interact with other smart contracts or own assets. The ERC6551 system addresses this by binding a unique smart contract account to each ERC-721 token, enabling the token to interact with other contracts, hold assets, and more.

## Setup and Installation

Before you can run this project, make sure that you have Node.js and npm installed. You'll also need to install the Hardhat development environment.

You can install the dependencies of the project with:

```bash
npm install
```

## Deployment

To deploy the contracts to the Hardhat network, run:

```bash
npx hardhat run scripts/deploy.js --network hardhat
```

To deploy the contracts to another network, replace `hardhat` with the name of your network.

## Testing

To run the tests, use:

```bash
npx hardhat test
```

This will run the tests located in the `test` directory.

## Code Structure

This project contains the following smart contracts:

- NFT: A basic implementation of an ERC721 contract which can mint new tokens.
- ERC6551Registry: A contract which manages the creation of ERC6551 accounts for ERC-721 tokens.
- ERC6551Account: The contract that is bound to each ERC-721 token and can hold assets and interact with other contracts.

## Contributions

Contributions are welcome! Feel free to open an issue or submit a pull request.