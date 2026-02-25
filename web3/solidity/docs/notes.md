# Solidity Notes

## Forge

### Foundry Keystore

Foundry keystore can be used to securely save private keys in an encrypted file. This is useful for storing wallet private keys for deployment and other actions.

The `cast` CLI is used to create and manage a keystore.

```sh
cast wallet import <account-name> --interactive
# cast wallet import dev-learning --interactive
```

List the keystores.

```sh
cast wallet list
```

Use the private key in a deployment or send transaction. A prompt will appear to input the keystore password.

```sh
forge create src/MyContract.sol:MyContract --rpc-url $RPC_URL --account dev-learning
cast send 0xAddress... "func(uint256)" 123 --rpc-url $RPC_URL --account dev-learning
```

### Cast CLI

Send a transaction that changes the state of the blockchain.

```sh
cast send <contract-address> "<function-abi>" <function-parameters> --rpc-url $RPC_URL --account dev-learning
# cast send 0x5FbDB2315678afecb367f032d93F642f64180aa3 "store(uint256)" 1337 --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

Call a read function.

```sh
cast call <contract-address> "<function-abi>" <function-parameters>
# cast call 0x5FbDB2315678afecb367f032d93F642f64180aa3 "retrieve()"
```
