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
