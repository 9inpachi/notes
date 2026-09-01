// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { AggregatorV3Interface } from '@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol';
import { PriceConverter } from './PriceConverter.sol';

// --- Errors
error NotOwner();

/**
 * @title A Sample Funding Contract
 * @notice This contract is for creating a sample funding contract.
 * @dev This implements price feeds as our library.
 */
contract FundMe {
  // --- Type Declarations
  // With this, functions inside `PriceConverter` with `uint256` as the
  // first parameter can used like this `uint256.functionName()`.
  using PriceConverter for uint256;

  // --- State Variables
  uint256 public constant MINIMUM_USD = 5e18;
  // Like constants but values of immutable variables can be set inside
  // the contract constructor.
  address public immutable i_owner;
  address[] private s_funders;
  mapping(address funder => uint256 amountFunded) public s_addressToAmountFunded;
  AggregatorV3Interface s_priceFeed;

  //  --- Modifiers
  modifier onlyOwner() {
    if (msg.sender != i_owner) {
      revert NotOwner();
    }

    _;
  }

  // Functions Order:
  //// constructor
  //// receive
  //// fallback
  //// external
  //// public
  //// internal
  //// private
  //// view / pure
  
  constructor(address priceFeed) {
    s_priceFeed = AggregatorV3Interface(priceFeed);
    // Set the address that deployed the contract as the owner.
    i_owner = msg.sender;
  }

  // `payable` is used when sending ETH to the contract. It's not needed
  // when withdrawing ETH.
  function fund() public payable {
    require(msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD, 'At least 5 USD worth of ETH is required');
    s_funders.push(msg.sender);
    s_addressToAmountFunded[msg.sender] = s_addressToAmountFunded[msg.sender] + msg.value;
  }

  function withdraw() public onlyOwner {
    for (uint256 i = 0; i < s_funders.length; ++i) {
      address funder = s_funders[i];
      s_addressToAmountFunded[funder] = 0;
    }

    s_funders = new address[](0);

    (bool callSuccess,) = payable(msg.sender).call{ value: address(this).balance }('');
    require(callSuccess, 'Call failed to transfer funds');
  }

  function getVersion() external view returns (uint256) {
    return s_priceFeed.version();
  }

  // Special function called when a transaction is sent to the contract
  // without any calldata.
  receive() external payable {
    fund();
  }

  // Special function called when a transaction is sent to the contract
  // with some calldata that doesn't map to an existing function.
  fallback() external payable {
    fund();
  }

}
