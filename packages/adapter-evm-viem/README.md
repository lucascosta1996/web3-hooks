
# @web3-hooks/adapter-evm-viem

Viem-based EVM adapter for the Web3 Hooks ecosystem.

Provides `createEvmClient()` which connects Web3 Hooks to **any EVM RPC endpoint**.

✅ Works with Infura / Alchemy / Public nodes  
✅ Compatible with all React hooks in `@web3-hooks/react`  
✅ Enables multi‑chain RPC flexibility

## Installation

```bash
pnpm add @web3-hooks/adapter-evm-viem viem
# or
npm install @web3-hooks/adapter-evm-viem viem
```

## Usage

```ts
import { createEvmClient } from "@web3-hooks/adapter-evm-viem"

const client = createEvmClient({
  rpcUrl: "https://ethereum.publicnode.com",
  chainId: 1,
})

const latestBlock = await client.rpc.request({
  method: "eth_blockNumber",
  params: [],
})
console.log(latestBlock)
```

> Used automatically when importing from `@web3-hooks/preset-evm`

## License

MIT — Web3 Hooks Contributors
