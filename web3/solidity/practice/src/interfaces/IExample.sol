// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

interface IExample {
  /**
   * @notice Sets a value in the contract
   * @dev This function allows setting a string value in the contract.
   * @param _value The string value to set
   */
  function setValue(string memory _value) external;

  /**
   * @notice Gets the current value from the contract
   * @dev This function retrieves the string value stored in the contract.
   * @return value The current string value stored in the contract
   */
  function getValue() external view returns (string memory value);
}
