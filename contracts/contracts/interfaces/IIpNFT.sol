// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

interface IIpNFT {
    function mint(
        address to,
        uint256 tokenId,
        string calldata _tokenURI
    ) external;
}
