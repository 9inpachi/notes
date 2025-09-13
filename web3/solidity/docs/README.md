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

### Package Management

There are two ways to manage packages/libraries when using foundry. Both of them require some manual setup.

1. Using `npm install <package>`. For example, `pnpm install @openzeppelin/contracts`.
   - This puts the library inside `node_modules/<package>`.
   - We then have to add `remappings` in [foundry.toml](./foundry.toml) like `remappings = ['forge-std/=node_modules/@openzeppelin/contracts']`.
2. Using `forge install <package>`. For example, `forge install @openzeppelin/openzeppelin-contracts`.
   - This puts the library inside `lib/<package>`.
   - We then have to add `remappings` in [foundry.toml](./foundry.toml) like `remappings = ['forge-std/=lib/openzeppelin-contracts']`.
   - A downside to using `forge install` is that it will require to do an install for all libraries whereas in npm we can just do `npm install` to install all libraries.

This development setup using npm as that's easier to manage. 

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

### Deploy to Testnet (Holesky)

1. Get an API key from Etherscan: <https://etherscan.io/apidashboard>
2. Add holesky RPC to `foundry.toml`.
   ```text
   [rpc_endpoints]
   holesky = "${HOLESKY_RPC}"
   ```
3. Setup environment variables in `.env` for deployment.
   ```text
   HOLESKY_RPC=<rpc>
   PRIVATE_KEY=<private-key> # Private key of the wallet that will deploy the contract.
   ETHERSCAN_API_KEY=<api-key>
   ```
4. Create a deployment script.

   ```solidity
   contract ExampleScript is Script {
      function run() public {
         vm.startBroadcast();
         new Example();
         vm.stopBroadcast();
      }
   }
   ```

5. Load `.env` variables.
   ```sh
   source .env
   ```
6. Make sure the wallet has ETH for gas and deploy the contract by calling the script through foundry.
   ```sh
   forge script script/ExampleDeploy.s.sol:ExampleDeploy \
   --rpc-url holesky\
   --private-key <private-key> \
   --broadcast \
   --verify
   ```

Link to the `Example` contract deployed from this repo: <https://holesky.etherscan.io/address/0xbbc2ea2b71a2a23079bacd55971aa49de413f2d6>
