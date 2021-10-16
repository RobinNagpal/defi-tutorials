import { node_url, accounts } from "./utils/network";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import { HardhatUserConfig } from "hardhat/types";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.6",
  },
  namedAccounts: {
    deployer: "0x470579d16401a36BF63b1428eaA7189FBdE5Fee9",
    tokenOwner: 1,
  },
  networks: {
    ropsten: {
      url: node_url("ropsten"),
      accounts: accounts("ropsten"),
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
  paths: {
    sources: "src",
  },
};
export default config;
