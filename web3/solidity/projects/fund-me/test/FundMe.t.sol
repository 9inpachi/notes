// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {FundMe} from "../src/FundMe.sol";

contract FundMeTest is Test {
    FundMe fundMe;

    function setUp() public {
        fundMe = new FundMe(0x694AA1769357215DE4FAC081bf1f309aDC325306);
    }

    function testMinimumDollarIsFive() public view {
        assertEq(fundMe.MINIMUM_USD(), 5e18);
    }

    // Failing test
    // function testOwnerIsMsgSender() public view {
    //     console.logAddress(fundMe.i_owner());
    //     console.logAddress(msg.sender);
    //     assertEq(fundMe.i_owner(), msg.sender);
    // }

    function testOwnerIsMsgSender() public view {
        assertEq(fundMe.i_owner(), address(this));
    }

    // NOTE: This test requires a chain fork to run.
    // `forge test --fork-url https://1rpc.io/sepolia`
    function testPriceFeedVersion() public view {
        assertEq(fundMe.getVersion(), 4);
    }
}
