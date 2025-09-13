// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import { Example } from '../src/contracts/Example.sol';
import { Script } from 'forge-std/Script.sol';

contract ExampleDeploy is Script {
  Example public example;

  function setUp() public { }

  function run() public {
    vm.startBroadcast();

    example = new Example();

    vm.stopBroadcast();
  }
}
