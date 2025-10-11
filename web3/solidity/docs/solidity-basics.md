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
- Deploying to ZKsync L2 chain.
  - Bridge Sepolia ETH from Mainnet Sepolia to ZKSync Sepolia.
    - Bridge can be done from here <https://portal.zksync.io/bridge/>
  - Write and compile a contract on <https://remix.ethereum.org>.
  - Install the "ZKsync" plugin on <https://remix.ethereum.org>.
    - Now make sure all other files besides the `.sol` file which contains the contract are kept or the contract files are inside the `contracts` directory. Otherwise, the plugin will not be able to compile and deploy the contract.
  - From the sidebar, navigate to the "ZKsync" plugin and compile and deploy the contract using the wallet.
    - The [`01-SimpleStorage.sol`](../practice/src/contracts/course/01-SimpleStorage.sol) from this repo is deployed here: <https://sepolia.explorer.zksync.io/address/0xbcd3D066930988F084c304e500739D13dd50423f>
