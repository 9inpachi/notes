# Solidity Basics

Basics of the Solidity language.

## Code References

- [SolidityBasics](../practice/src/contracts/SolidityBasics.sol)

## IDEs

- <https://remix.ethereum.org>
  - Supports development and deployment of contracts.

## Notes

- `view` and `pure` state mutability modifiers.
  - `view` only allows reading from the state but not writing any state.
  - `pure` doesn't event allow reading from the state. It's a pure function.
  - Both `view` and `pure` function don't cost any gas.
    - Exception is when these functions are called inside the smart contract. Then the execution cost becomes a part of the transaction fee.
- Data locations: `calldata`, `memory`, `storage` (there are more)
  - Relevant for complex types including arrays, mapping and string which need to know where to be stored. EVM has multiple places to read and write data from.
  - `calldata`: Temporary variable that cannot be updated inside a function.
  - `memory`: Temporary variable that can be updated inside a function.
  - `storage`: Permanent variable that can be updated. Contract state (member) variables are `storage` by default. `storage` cannot be used for a function parameter.
