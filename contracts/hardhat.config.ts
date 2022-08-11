import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "solidity-coverage";

dotenv.config();

const config: HardhatUserConfig = {
    paths: {
        sources: "./contracts",
        cache: "./cache",
        artifacts: "./build",
        tests: "./test",
    },
    mocha: {
        timeout: 90000,
    },
    typechain: {
        outDir: "build/types",
        target: "ethers-v5",
        alwaysGenerateOverloads: false,
    },
    solidity: {
        compilers: [
            {
                version: "0.8.16",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 99999,
                    },
                },
            },
        ],
    },
    networks: {
        polygon: {
            url: process.env.NETWORK_URL || "",
            accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
        },
        polygonMumbai: {
            url: process.env.NETWORK_URL || "",
            accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
        },
    },
    etherscan: {
        apiKey: {
            polygon: `${process.env.POLYGONSCAN_API_KEY}`,
            polygonMumbai: `${process.env.POLYGONSCAN_API_KEY}`,
        }
    },
};

export default config;
