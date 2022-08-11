import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { getContractAddress, parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import {
    MockToken,
    MockToken__factory,
    DeSciPlatform,
    DeSciPlatform__factory,
    IpNFT,
    IpNFT__factory,
} from "../build/types";
import { ProposalMilestoneInputStruct } from "../build/types/contracts/DeSciPlatform";

describe.only("DeSciPlatform", function () {
    let deployer: SignerWithAddress;
    let funder: SignerWithAddress;
    let researcher: SignerWithAddress;
    let researcher2: SignerWithAddress;

    let fundingToken: MockToken;
    let deSciPlatform: DeSciPlatform;
    let ipNft: IpNFT;

    before(async function () {
        [deployer, funder, researcher, researcher2] = await ethers.getSigners();

        fundingToken = await new MockToken__factory()
            .connect(deployer)
            .deploy("USD Coin", "USDC");
        await fundingToken.deployed();

        await fundingToken.transfer(funder.address, parseEther("10000"));

        const deSciPlatformAddress = getContractAddress({
            from: deployer.address,
            nonce: (await deployer.getTransactionCount()) + 1,
        });

        ipNft = await new IpNFT__factory().connect(deployer).deploy(deSciPlatformAddress);
        await ipNft.deployed();

        deSciPlatform = await new DeSciPlatform__factory()
            .connect(deployer)
            .deploy(ipNft.address, fundingToken.address);
        await deSciPlatform.deployed();
    });

    describe("scenarios", function () {
        it("Happy Flow.", async function () {
            // ARRANGE
            console.log("mint");
            await fundingToken.connect(funder).mint(funder.address, parseEther("1500"));
            console.log("approve");
            await fundingToken
                .connect(funder)
                .approve(deSciPlatform.address, parseEther("1500"));

            // ACT

            // FUNDER: create a proposal

            const milestones: ProposalMilestoneInputStruct[] = [
                {
                    payoutAmount: parseEther("500"),
                    comment: "test1",
                    percentage: 50,
                },
                {
                    payoutAmount: parseEther("1000"),
                    comment: "test1",
                    percentage: 100,
                },
            ];

            await deSciPlatform
                .connect(funder)
                .createResearchProposal(
                    "Test Name",
                    "Test Description",
                    funder.address,
                    "test",
                    "testPic",
                    milestones
                );

            // RESEARCHER: apply for the research

            await deSciPlatform.connect(researcher).applyForResearch(0);
            await deSciPlatform.connect(researcher2).applyForResearch(0);

            // FUNDER: assign a researcher

            await deSciPlatform.connect(funder).assignResearcher(0, researcher.address);

            const propStart = await deSciPlatform.getProposal(0);
            console.log("propStart");
            console.log(propStart);

            // RESEARCHER: submit milestona as a researcher, index 0

            await deSciPlatform.connect(researcher).submitMilestone(0, 0, "");

            // FUNDER: confirm milestone, index 0

            await deSciPlatform.connect(funder).confirmMilestoneCompleted(0, 0, "");

            // RESEARCHER: submit milestona as a researcher, index 1

            await deSciPlatform.connect(researcher).submitMilestone(0, 1, "");

            // FUNDER: confirm milestone, index 1
            // ipNFT is created

            await deSciPlatform.connect(funder).confirmMilestoneCompleted(0, 1, "test");

            // ASSERT

            // verify funder is the ipNFT holder
            expect(await ipNft.ownerOf(0)).to.be.equal(funder.address);
        });
    });
});
