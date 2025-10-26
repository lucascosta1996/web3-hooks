
# @web3-hooks/react

React Query–powered Web3 hooks for Ethereum and compatible networks.

Includes:
✅ Async data caching with React Query  
✅ Hooks for chain, blocks, and ERC‑20 state  
✅ Designed to interoperate with `@web3-hooks/core`  
✅ Provider wrapper for RPC context

## Installation

```bash
pnpm add @web3-hooks/react @tanstack/react-query react react-dom
# or
npm install @web3-hooks/react @tanstack/react-query react react-dom
```

## Quick Example

```tsx
"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Web3Provider, createEvmClient, useChainId } from "@web3-hooks/react"

const qc = new QueryClient()
const client = createEvmClient({ rpcUrl: "https://ethereum.publicnode.com", chainId: 1 })

export default function App() {
  const { data: chainId } = useChainId()

  return (
    <QueryClientProvider client={qc}>
      <Web3Provider client={client}>
        <div>Connected chain: {chainId}</div>
      </Web3Provider>
    </QueryClientProvider>
  )
}
```

📌 You must wrap your app in **both**:
- `QueryClientProvider`
- `Web3Provider`

## Available Hooks

| Hook | Description |
|------|-------------|
| `useChainId()` | Returns current chain ID |
| `useBlockNumber()` | Watches latest block |
| `useBalanceOf(address, token)` | Loads ERC‑20 token balance |

More hooks coming soon!

## License

MIT — Web3 Hooks Contributors
