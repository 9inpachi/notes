// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { PriceConverter } from './02-PriceConverter.sol';

contract FundMe {
  // With this, functions inside `PriceConverter` with `uint256` as the
  // first parameter can used like this `uint256.functionName()`.
  using PriceConverter for uint256;

  uint256 public minimumUsd = 5e18;
  address public owner;

  address[] public funders;
  mapping(address funder => uint256 amountFunded) public addressToAmountFunded;

  constructor() {
    // Set the address that deployed the contract as the owner.
    owner = msg.sender;
  }

  function fund() public payable {
    require(msg.value.getConversionRate() >= minimumUsd, 'At least 1 ETH is required');
    funders.push(msg.sender);
    addressToAmountFunded[msg.sender] = addressToAmountFunded[msg.sender] + msg.value;
  }

  function withdraw() public payable {
    require(msg.sender == owner, 'Caller must be the owner of the contract.');

    for (uint256 i = 0; i < funders.length; ++i) {
      address funder = funders[i];
      addressToAmountFunded[funder] = 0;
    }

    // Reset the array by creating a new array with 0 length.
    funders = new address[](0);

    // Transfer the funds to the caller.
    // 1. Use payable.transfer
    // payable(msg.sender).transfer(address(this).balance);

    // 2. Use payable.send
    // bool sendSuccess = payable(msg.sender).send(address(this).balance);
    // require(sendSuccess, "Send failed");

    // 3. Use payable.call (this is the standard) - `call` is a low
    // level function that can be used to call any smart contract function
    // without an ABI.
    (bool callSuccess,) = payable(msg.sender).call{ value: address(this).balance }('');
    require(callSuccess, 'Call failed to transfer funds');
  }
}
