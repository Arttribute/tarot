const hre = require("hardhat");

async function main() {
  const Tarot = await hre.ethers.getContractFactory("Tarot");
  const contract = await Tarot.deploy();
  await contract.waitForDeployment();
  console.log("Tarot contract deployed to:", await contract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
