// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;
// Version Range
// pragma solidity >=0.8.18 <0.9.0;
// Exact Version
// pragma solidity 0.8.18;

// A contract is like a class in an object-oriented programming
// language.
contract SolidityBasics {
  // SECTION 1: Types

  // Basic Types: bool, string, uint, int, address, bytes
  bool hasFavorite = true;
  // `uint` can be from `uint2` to `uint256`. Just `uint` is `uint256`.
  uint256 unsignedNumber = 100;
  int256 signedNumber = -100;
  string hello = 'world';
  address someAddress = 0xBbC2ea2B71A2A23079baCd55971Aa49De413f2d6;
  // This is an advanced type. Can be from bytes2 to bytes32.
  bytes32 someBytes = 'world';

  // SECTION 2: Functions

  // SECTION 2.1: Visibility Options

  // Visible both externally and internally and creates a getter for storage/state variables.
  uint256 public publicVar;
  // Only visible in the current contract.
  uint256 private privateVar;
  // Only visible to the current and child contracts. (Like `protected` in Java)
  uint256 internal internalVar;

  // Only usable in functions. Makes the function only visible
  // externally (via message call `this.func`).
  function externalFunc() external { }

  // SECTION 2.2: Storage Functionality

  // Gets initialized to 0.
  uint256 public numberToStore;

  function storeNumber(uint256 _numberToStore) public {
    numberToStore = _numberToStore;
  }

  // `view` notates that the function can't update any state,
  // only reads it and doesn't need a `send` transaction.
  // `pure` notates that the function can't update or even read any state.
  // Both `view` and `pure` don't need gas fee as they don't send a transaction.
  function retreive() public view returns (uint256) {
    return numberToStore;
  }

  // This function is pure as it doesn't read from or write to the state.
  function someConstant() public pure returns (uint256) {
    return 100 ether;
  }
}
