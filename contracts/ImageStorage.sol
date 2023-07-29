// ImageStorage.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ImageStorage {
    mapping(string => bytes32) private imageHashes;

    function storeImageHash(string memory fileName, bytes32 hash) public {
        imageHashes[fileName] = hash;
    }

    function getImageHash(string memory fileName) public view returns (bytes32) {
        return imageHashes[fileName];
    }
}
