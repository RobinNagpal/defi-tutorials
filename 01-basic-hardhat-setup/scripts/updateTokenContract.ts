const { ethers, upgrades } = require("hardhat");

async function main() {
  const { deployer, tokenOwner } = await ethers.getNamedSigners();

  const TokenContract = await ethers.getContractFactory("TokenContact", deployer);
  await upgrades.upgradeProxy("0xCa1138F0452c7F7f1b889E87cb65AE2e86f4d584", TokenContract);
  console.log("Token Contract Updated");
}

main();
