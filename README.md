# Ethseoul 2022 DeSci Connect

Team: Blobs

Link to the video

## What is DeSci

DeSci will **empower the Researcher** that could otherwise be held bach after selected funding, misaligned incentives, gatekeeping and others.

DeSci allows **decentralized**, distributed, potentially anonymous ownership over money, data and funding flows. A decentralized research network allows people to connect in a trustless and transparrent manner.

**Cryptograhically secured systems** open many possibilities to introduce new, never bebore seen researches and collaborations.

## DeSci Platform

Features:

- Propose and fund research
- Apply to a proposed research as a researcher
- Milestone guided research
    - Researcher is funded for each completed milestone
    - Funder confirms the submited milestone research
- ipNFT is created for each completed research
    - ipNFT owner hold the IP rights to the research

## Code

### Client

Client code can be found in the `client` folder.
Client code is writen in React.

### Contracts

Smart contracts can be found in `contracts` folder.
Smart contracts are written in Solidity using Hardhat, Ethers, and Waffle packages.

### IPFS

#### Why?

Upload any data via API or web UI for free. The data will end up on a decentralized set of IPFS and Filecoin storage providers. This is perfect for the usecase od decentralized science, as the research is public, permanent and non-modyfiable.

#### What framework was used?

Storing data on IPFS is done via [web3.storage](https://web3.storage).

#### Where in code is IPFS used?

- [Creating proposal requests](https://github.com/ryptoc/ethseoul-desci/blob/main/client/src/pages/P2PFunding/CreateRequest.tsx#L182)
- [Submitting milestones for requests](https://github.com/ryptoc/ethseoul-desci/blob/main/client/src/pages/OnGoingProject/NewSubmission.tsx#L40)
- [Uploading image for ipNFT](https://github.com/ryptoc/ethseoul-desci/blob/main/client/src/pages/P2PFunding/CreateRequest.tsx#L183)
- [Uploading metadata for ipNFT](https://github.com/ryptoc/ethseoul-desci/blob/main/client/src/modals/SubmitMilestoneModal.tsx#L59)

### Polygon

Contracts are deployed on Polygon testnet - Mumbai

- DeSciPlatform:
- IpNFT: 
