// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { AggregatorV3Interface } from '@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol';

library PriceConverter {
  function getPrice() internal view returns (uint256) {
    // ETH/USD testnet address. https://docs.chain.link/data-feeds/price-feeds/addresses
    AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
    (, int256 price,,,) = priceFeed.latestRoundData();

    // This will return us the price in terms of wei. For example, if a
    // price feed has 9 decimals, it will add (18 - 9 = 9) zeroes to the
    // price so we get the price in wei and can directly multiple with
    // ETH value.
    uint256 priceInWei = uint256(price) * 10 ** (18 - priceFeed.decimals());

    return priceInWei;
  }

  function getConversionRate(uint256 value) internal view returns (uint256) {
    uint256 ethPrice = getPrice();

    // We divide by 1e18 to reset the additional decimal places added
    // because of both the value and price being 18 decimals. Dividing the
    // value with 1e18 will bring the result back to 18 decimals instead of
    // 36 decimals.
    uint256 ethAmountInUsd = (value * ethPrice) / 1e18;

    return ethAmountInUsd;
  }
}
