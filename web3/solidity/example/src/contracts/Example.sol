// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import { IExample } from '../interfaces/IExample.sol';

contract Example is IExample {
  string private value;

  function setValue(string memory _value) external {
    value = _value;
  }

  function getValue() external view returns (string memory) {
    return value;
  }
}
