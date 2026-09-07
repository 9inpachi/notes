# Glossary

> **What this is:** crisp, one-line-ish definitions of the jargon used across these docs, in
> everyday language. First uses elsewhere link here. Alphabetized.
>
> **Fork note:** values reflect mainnet in the Fusaka era (mid-2026).

---

### Attestation
A validator's vote, cast roughly once per [epoch](#epoch), saying "this is the head of the
chain, and this is the last block I consider [finalized](#finality)." Attestations are the raw
material of consensus — they're tallied to decide which chain wins and when blocks finalize.
See **[Duties](02-consensus-layer/04-duties.md)**.

### Beacon Chain
The blockchain run by the [consensus layer](#consensus-layer-cl). It tracks validators, their
balances, votes, and which blocks are finalized. It is the "coordinator" chain; the actual
transactions live inside the [execution payloads](#execution-payload) it carries.

### Beacon Node
A program (e.g. [Lighthouse](04-lighthouse/01-architecture.md)) that runs the Beacon Chain:
follows the network, runs [fork choice](#fork-choice), and serves the
[Beacon API](#beacon-api). It does *not* hold validator keys — that's the
[validator client](#validator-client)'s job.

### Beacon API
The standardized HTTP/REST API every beacon node exposes, e.g.
`GET /eth/v1/beacon/states/head/finality_checkpoints`. Defined by
[ethereum/beacon-APIs](https://github.com/ethereum/beacon-APIs). Covered hands-on in
**[Fetching Validator Info](04-lighthouse/04-fetching-validator-info.md)**.

### Blob
A large chunk of data (~128 KB) attached to a block but *not* stored forever — it's
auto-deleted after ~18 days. Blobs are how layer-2 rollups post cheap data to Ethereum
(EIP-4844). The number of blobs per block has grown over time (target 14 / max 21 as of early
2026, after Fusaka's BPO forks).

### Casper FFG
The "finality gadget" half of Ethereum's consensus. It uses validator votes to **justify** and
then **finalize** checkpoints — the mechanism that makes blocks permanent. Pairs with
[LMD-GHOST](#lmd-ghost) to form [Gasper](#gasper). See
**[Finality & Fork Choice](02-consensus-layer/06-finality-and-fork-choice.md)**.

### Checkpoint
The first [slot](#slot) of an [epoch](#epoch) (its boundary block). Finality in Ethereum is
defined on checkpoints, not arbitrary blocks. "[Justified](#justification)" and "finalized"
both describe checkpoints.

### Checkpoint sync
A fast way to start a beacon node: instead of replaying all history from genesis, you trust a
recent finalized [checkpoint](#checkpoint) (from a URL or a friend's node) and sync forward
from there. Takes minutes instead of days. See
**[Installation & Setup](04-lighthouse/02-installation-and-setup.md)**.

### Committee
A randomly-selected group of validators assigned to vote in a particular [slot](#slot). Think
of it as a jury drawn from the full validator pool, reshuffled every [epoch](#epoch) so no
small group can collude. See **[Slots & Epochs](02-consensus-layer/02-beacon-chain-slots-epochs.md)**.

### Consensus Layer (CL)
The half of an Ethereum node responsible for *agreement*: proof of stake, choosing proposers,
collecting votes, and finalizing blocks. Runs the [Beacon Chain](#beacon-chain). Contrast with
the [execution layer](#execution-layer-el).

### Effective balance
A rounded-down, capped version of a validator's real balance, used for consensus math (reward
sizes, vote weight). It moves in 1-ETH steps and lags the real balance ("hysteresis") so it
doesn't churn constantly. Capped at 32 ETH for `0x01` validators and 2048 ETH for `0x02`
validators (post-[Pectra](05-network-upgrades.md)).

### Engine API
The small, private, JWT-authenticated channel between a node's [CL](#consensus-layer-cl) and
[EL](#execution-layer-el) clients (on localhost). Three core methods: `engine_newPayload`,
`engine_forkchoiceUpdated`, `engine_getPayload`. See
**[Engine API](03-el-cl-interface/02-engine-api.md)**.

### Epoch
A batch of 32 [slots](#slot) = 6.4 minutes. Many consensus events (committee shuffling, reward
accounting, finality) happen at epoch boundaries. See
**[Slots & Epochs](02-consensus-layer/02-beacon-chain-slots-epochs.md)**.

### EVM (Ethereum Virtual Machine)
The sandboxed "computer" inside the [execution layer](#execution-layer-el) that runs every
transaction and smart contract, deterministically. See **[EVM & State](01-execution-layer/01-evm-and-state.md)**.

### Execution Layer (EL)
The half of an Ethereum node that *runs transactions*: the [EVM](#evm-ethereum-virtual-machine),
the world state, the mempool, and the public [JSON-RPC API](#json-rpc-api). Contrast with the
[consensus layer](#consensus-layer-cl).

### Execution payload
The "EL part" of a block — the ordered list of transactions plus the resulting state root,
gas used, etc. The [CL](#consensus-layer-cl) wraps an execution payload inside each beacon
block. Built on request via the [Engine API](#engine-api).

### Finality
The point at which a block is permanent and will not be reverted (barring an attacker burning
billions of dollars). On Ethereum, blocks typically finalize ~2 [epochs](#epoch) (~13 min)
after they're proposed. See **[Finality & Fork Choice](02-consensus-layer/06-finality-and-fork-choice.md)**.

> **Analogy:** finality is ink drying. Before it dries, a smudge (reorg) is possible; after,
> it's set.

### Fork choice
The rule a node follows to pick the canonical chain when it sees competing blocks. Ethereum's
rule is [LMD-GHOST](#lmd-ghost) constrained by [Casper FFG](#casper-ffg) finality.

### Fork (network upgrade / hard fork)
A coordinated, scheduled change to the protocol rules that all clients adopt at a set
[slot](#slot). Recent mainnet forks: Pectra (2025), Fusaka (2025). See
**[Network Upgrades](05-network-upgrades.md)**.

### Gasper
Ethereum's full consensus protocol = [Casper FFG](#casper-ffg) (finality) +
[LMD-GHOST](#lmd-ghost) (fork choice). See **[PoS & Gasper](02-consensus-layer/01-pos-and-gasper.md)**.

### Gas
The unit that measures how much computation/storage a transaction uses. You pay for gas in ETH.
See **[Transactions & Gas](01-execution-layer/02-transactions-and-gas.md)**.

### Genesis
The very first block / starting state of a chain.

### JSON-RPC API
The public API of the [execution layer](#execution-layer-el): `eth_getBalance`, `eth_call`,
`eth_sendRawTransaction`, etc. What wallets and dapps talk to. See
**[JSON-RPC API](01-execution-layer/05-json-rpc-api.md)**.

### Justification
The first step toward [finality](#finality). A [checkpoint](#checkpoint) becomes "justified"
when ⅔ of staked ETH votes for it. When a justified checkpoint helps justify the *next* one,
the earlier one becomes finalized. See **[Finality & Fork Choice](02-consensus-layer/06-finality-and-fork-choice.md)**.

### JWT (for the Engine API)
A shared secret (a small hex file) that the CL and EL use to authenticate their
[Engine API](#engine-api) connection, so nothing else on the machine can impersonate them.

### LMD-GHOST
"Latest Message Driven, Greediest Heaviest Observed SubTree" — the fork-choice rule that picks
the chain with the most accumulated [attestation](#attestation) weight. The "which chain is
the head right now?" half of [Gasper](#gasper).

### MEV
**Maximal Extractable Value** — extra value a block proposer can capture by carefully ordering,
inserting, or censoring transactions (e.g. arbitrage, liquidations). Drives the
[block-building](01-execution-layer/03-mempool-and-block-building.md) market and "PBS".

### Proposer
The single validator chosen to build and broadcast the block for a given [slot](#slot).

### Reorg
Short for **reorganization** — when nodes briefly disagree on the head and the chain "switches"
to a different recent block,
discarding one or more just-proposed blocks. Normal in small doses near the head; impossible
once blocks are [finalized](#finality).

### Slashing
The serious penalty for provably malicious validator behavior (like double-voting or
double-proposing): a chunk of stake is burned and the validator is force-exited. Distinct from
small "you were offline" penalties. See **[Rewards, Penalties & Slashing](02-consensus-layer/05-rewards-penalties-slashing.md)**.

### Slot
A 12-second window in which (at most) one block can be proposed. The heartbeat of the Beacon
Chain. 32 slots = 1 [epoch](#epoch). See **[Slots & Epochs](02-consensus-layer/02-beacon-chain-slots-epochs.md)**.

### SSZ
**Simple Serialize** — the binary encoding the consensus layer uses for all its data structures
(and the basis for
its Merkle hashing / "hash tree root"). The CL's equivalent of the EL's RLP encoding.

### Sync committee
A group of 512 validators, rotating every ~27 hours, who continuously sign the chain head so
that ultra-light clients can follow Ethereum cheaply. See **[Duties](02-consensus-layer/04-duties.md)**.

### Validator
A staked participant in the [consensus layer](#consensus-layer-cl), identified by a BLS public
key and a numeric index. It proposes blocks and casts [attestations](#attestation). Backed by
staked ETH (32 ETH minimum to activate). See
**[Validator Lifecycle](02-consensus-layer/03-validator-lifecycle.md)**.

### Validator client
The program that holds validator signing keys and performs [duties](02-consensus-layer/04-duties.md)
(signing attestations and blocks). It asks a [beacon node](#beacon-node) what to do and when.
Kept separate from the beacon node for security. See
**[Validator Client & CLI](04-lighthouse/05-validator-client-and-cli.md)**.

### Withdrawal credentials
The part of a validator's record that says where its ETH goes when withdrawn. `0x01` = a fixed
Ethereum address (max 32 ETH effective). `0x02` = "compounding" (post-Pectra), allowing up to
2048 ETH and auto-restaking of rewards. `0x00` = old BLS-style, must be upgraded before
withdrawing.

### World state
The complete snapshot of every account's balance, nonce, contract code, and storage at a given
moment. Maintained by the [execution layer](#execution-layer-el). See
**[EVM & State](01-execution-layer/01-evm-and-state.md)**.
