// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import { Example } from '../src/contracts/Example.sol';
import { Test } from 'forge-std/Test.sol';

contract ExampleTest is Test {
  Example private example;

  function setUp() public {
    example = new Example();
  }

  function test_SetValue() public {
    example.setValue('Hello, World!');
    assertEq(example.getValue(), 'Hello, World!');
  }

  function testFuzz_SetValue(string memory value) public {
    example.setValue(value);
    assertEq(example.getValue(), value);
  }
}
