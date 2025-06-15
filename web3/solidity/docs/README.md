# Solidity

Solidity is an object oriented (contract oriented) programming language for implementing smart contracts. Smart contracts are programs that govern the behavior of accounts within the Ethereum state.

## Links

- <https://docs.soliditylang.org/en/v0.8.30/>
- <https://github.com/defi-wonderland/solidity-foundry-boilerplate>
- <https://github.com/protofire/solhint>
- <https://hardhat.org/tutorial>
- <https://github.com/foundry-rs/foundry>

## Development Setup

There are two major development frameworks for working with Solidity and smart contracts. Most teams use both as Foundry is faster with tests and Hardhat has a plugin ecosystem and better integration with JavaScript/TypeScript.

1. **Hardhat**
   - Hardhat is a development environment to compile, deploy, test, and debug your Ethereum software.
   - Relatively older and relies on the JavaScript ecosystem for a lot of things.
   - Larger ecosystem than Foundry and rich plugins support.
   - Relatively better debugger.
2. **Foundry**
   - Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.
   - Newer and faster because written in Rust.
   - Faster tests and built-in fuzzing.
   - Not reliant on JavaScript ecosystem but has its own.

Primary focus of this development setup will be on Foundry as that is more popular now.

### Tools

- **solhit:** For linting solidity code.
- **medusa:** Fuzzer for testing smart contracts by feeding a large number of diverse and unexpected inputs to identify potential vulnerabilities.

## Deployment

### Deploying Locally on Anvil

1. Start Anvil.
   ```sh
   anvil
   ```
2. Deploy the contract by copying one of the private keys from anvil logs in the terminal.
   ```sh
   forge create <path-to-contract>:<contract-name> --interactive
   ```
3. Call a contract function.
   ```sh
   cast call <contract-address> "functionName(arguments)(returnValue)" \
   --rpc-url localhost:8545
   ```
4. Run a transaction.
   ```sh
   cast send <contract-address> "functionName(arugments)" arg1 arg2 \
   --rpc-url localhost:8545 --private-key <private-key-from-anvil-logs>
   ```
