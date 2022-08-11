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
        rinkeby: {
            url: process.env.RINKEBY_URL || "",
            accounts: process.env.RINKEBY_PRIVATE_KEY !== undefined ? [process.env.RINKEBY_PRIVATE_KEY] : [],
        },
        polygonMumbai: {
            url: process.env.RINKEBY_URL || "",
            accounts: process.env.RINKEBY_PRIVATE_KEY !== undefined ? [process.env.RINKEBY_PRIVATE_KEY] : [],
        },
    },
    etherscan: {
        apiKey: {
            polygonMumbai: `${process.env.ETHERSCAN_API_KEY}`,
        }
    },
};

export default config;
