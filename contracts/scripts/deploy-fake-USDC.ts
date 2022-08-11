import { ethers } from "hardhat";
import { MockToken__factory } from "../build/types";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    console.log("Deploying DeSciPlatform contract. Please be patient.");
    console.log("");

    const [deployer] = await ethers.getSigners();

    const token = await new MockToken__factory()
        .connect(deployer)
        .deploy("USD Coin", "USDC");
    await token.deployed();

    const tx = await token.mint(deployer.address, parseFloat("10000"));

    await tx.wait(1);

    console.log(`Fake token deployed to: ${token.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
