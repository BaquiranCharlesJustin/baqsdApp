# Requirements
Node.JS 20.11.1

# how to init
npm install in root directory

npm install in baqswebmp

# scripts
edit wallet address in line 4

# edit keys in .env
private key (metamask private key)

api key (arbitrum API key)

# Contract address in react-component
in baqswebmp under config -> index.ts

edit line 6 to your contract address

# How to test
in root directory run cmd

npx hardhat run scripts/deploy.ts --network "arbitrum sepolia"


# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
