import { ethers } from "hardhat";
import { DeSciPlatform__factory, IpNFT__factory } from "../build/types";
import dotenv from "dotenv";
import { getContractAddress } from "ethers/lib/utils";

dotenv.config();

const TOKEN_ADDRESS = "";

async function main() {
    console.log("Deploying contracts. Please be patient.");
    console.log("");

    const [deployer] = await ethers.getSigners();

    const deSciPlatformAddress = getContractAddress({
        from: deployer.address,
        nonce: (await deployer.getTransactionCount()) + 1,
    });

    const ipNFT = await new IpNFT__factory()
        .connect(deployer)
        .deploy(deSciPlatformAddress);
    await ipNFT.deployed();

    console.log(`IpNFT deployed to: ${ipNFT.address}`);

    const deSciPlatform = await new DeSciPlatform__factory()
        .connect(deployer)
        .deploy(ipNFT.address, TOKEN_ADDRESS);
    await deSciPlatform.deployed();

    console.log(`DeSciPlatform deployed to: ${deSciPlatform.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
