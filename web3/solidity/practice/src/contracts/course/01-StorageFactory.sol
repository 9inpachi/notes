// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SimpleStorage } from './01-SimpleStorage.sol';

/**
 * This contract is a factory for creating and deploying new contracts. 
 */
contract StorageFactory {
  SimpleStorage[] public simpleStorageContracts;

  function createSimpleStorageContract() public {
    // This will deploy a new contract using this factory contract.
    SimpleStorage newSimpleStorage = new SimpleStorage();
    simpleStorageContracts.push(newSimpleStorage);
  }

  function storeFavoriteNumber(uint256 contractIndex, uint256 favoriteNumber) public {
    require(contractIndex < simpleStorageContracts.length && contractIndex >= 0, 'Invalid contract index');

    SimpleStorage simpleStorage = simpleStorageContracts[contractIndex];

    simpleStorage.storeFavoriteNumber(favoriteNumber);
  }

  function retreiveFavoriteNumber(uint256 contractIndex) public view returns (uint256) {
    require(contractIndex < simpleStorageContracts.length && contractIndex >= 0, 'Invalid contract index');

    SimpleStorage simpleStorage = simpleStorageContracts[contractIndex];
    // Alternatively, if we were using address for SimpleStorage.
    // SimpleStorage simpleStorage = SimpleStorage(contractAddress);

    return simpleStorage.retrieveFavoriteNumber();
  }
}
