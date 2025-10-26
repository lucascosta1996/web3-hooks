
# @web3-hooks/core

Core utilities and Web3 client abstractions that power the `web3-hooks` ecosystem.

This package is framework-agnostic and contains:
✅ Core RPC functions  
✅ Types & helpers  
✅ Shared hook logic consumed by @web3-hooks/react  
✅ Client factory functions for EVM adapters

## Installation

```bash
pnpm add @web3-hooks/core viem
# or
npm install @web3-hooks/core viem
```

## What This Package Provides

- `createClient()` abstraction for blockchain RPC handling
- Standardized requests with automatic error typing
- Utilities reused across multiple adapters and UI layers

```ts
import { createClient } from "@web3-hooks/core"

const client = createClient({
  rpcUrl: "https://ethereum.publicnode.com",
  chainId: 1,
})

const blockNumber = await client.rpc.request({
  method: "eth_blockNumber",
  params: [],
})
console.log(blockNumber)
```

> Typically used via presets such as `@web3-hooks/preset-evm`

## License

MIT — Web3 Hooks Contributors
