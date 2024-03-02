import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("buchi", ["0x660e9a7454Bd0142EdD0eb0261f1cd3A72a0Bc94"]);

  await lock.waitForDeployment();

  console.log(
    `Token deployed to ${lock.target}`
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});