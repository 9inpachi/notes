// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract OpToken is ERC20 {
  constructor(uint256 initialSupply) ERC20('OP Token', 'OpToken') {
    _mint(msg.sender, initialSupply);
  }
}
