// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "./interfaces/IIpNFT.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/* ========== CONTRACTS ========== */

/**
 * @title IP NFT for DeSci researches.
 * @notice The NFTs serve as a proof of intellectual property of the research.
 */
contract IpNFT is IIpNFT, ERC721URIStorage, Ownable {
    /* ========== CONSTRUCTOR ========== */

    /**
     * @notice Initialize nft and transfer ownership to deSciPlatform
     * 
     * @param deSciPlatform address of desci platform
     */
    constructor(address deSciPlatform) ERC721("IP NFT DeSci", "ipNFT") {
        transferOwnership(deSciPlatform);
    }

    /**
     * @notice Mint an ipNFT
     * @dev
     * NFT id is the same as research proposal id.
     * Can only be called by the DeSciPlatform (owner)
     * 
     * @param to address of ipNFT owner
     * @param tokenId NFT id
     * @param _tokenURI IPFS URI to the NFT metadata
     */
    function mint(
        address to,
        uint256 tokenId,
        string calldata _tokenURI
    ) external override onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
    }
}
