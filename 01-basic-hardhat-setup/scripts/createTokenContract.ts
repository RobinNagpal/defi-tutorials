import { HardhatRuntimeEnvironment } from "hardhat/types";

const { ethers, upgrades } = require("hardhat");

export default async function main(hre?: HardhatRuntimeEnvironment) {
  const { deployer, tokenOwner } = await ethers.getNamedSigners();

  const TokenContract = await ethers.getContractFactory("TokenContact", deployer);
  const tokenContract = await upgrades.deployProxy(TokenContract, ["JOMO", "Jomo dev Token", 100000], {});
  await tokenContract.deployed();
  console.log("Token contract deployed to:", tokenContract.address);
}

main();
