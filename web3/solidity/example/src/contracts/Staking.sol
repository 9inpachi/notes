// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import { IERC20 } from 'forge-std/interfaces/IERC20.sol';

struct StakeInfo {
  uint256 amount;
}

contract StakingToken {
  IERC20 public immutable stakingToken;
  uint256 public totalStaked;
  mapping(address => StakeInfo) public stakes;

  error UnstakeError(string message);

  constructor(IERC20 _stakingToken) {
    stakingToken = _stakingToken;
  }

  function stake(uint256 _amount) public {
    require(_amount > 0, 'Cannot stake nothing');

    // This is a way to create a new key or access existing key.
    StakeInfo storage userStake = stakes[msg.sender];

    stakingToken.transferFrom(msg.sender, address(this), _amount);
    userStake.amount += _amount;
    totalStaked += _amount;
  }

  function unstake(uint256 _amount) public {
    require(_amount > 0, 'Cannot unstake negative amount');

    StakeInfo storage userStake = stakes[msg.sender];

    if (userStake.amount < _amount) {
      revert UnstakeError('User does not have enough amount');
    }

    stakingToken.transferFrom(address(this), msg.sender, _amount);
    userStake.amount -= _amount;
    totalStaked -= _amount;
  }
}
