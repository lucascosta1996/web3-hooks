# web3-hooks

A modular **React hooks library** for interacting with **Web3 technologies** — designed for composability, framework-agnostic adapters, and seamless developer experience.

## Overview

`web3-hooks` provides a unified, type-safe set of React hooks that make reading blockchain data and interacting with smart contracts effortless.  
It’s organized as a **pnpm monorepo** with multiple workspaces:

```
web3-hooks/
├─ packages/
│  ├─ core/                # Shared utilities and types
│  ├─ adapter-evm-viem/    # EVM adapter using viemx
│  └─ react/               # React hooks built on top of core + adapters
└─ apps/
   └─ playground/          # Next.js playground demo app
```

Each adapter can plug into the React layer to expose network-specific hooks (`useBlockNumber`, `useBalance`, etc).

---

## Packages

| Package | Description |
|----------|-------------|
| **@web3-hooks/core** | Core interfaces, base client logic, and shared helpers |
| **@web3-hooks/adapter-evm-viem** | EVM implementation powered by [`viem`](https://viem.sh) |
| **@web3-hooks/react** | High-level React hooks and context providers |
| **@web3-hooks/playground** | Next.js app demonstrating library usage |

---

## Example Usage

```tsx
'use client'
import {
  Web3Provider,
  useBlockNumber,
  useChainId,
  useGasPrice,
  useBalance,
} from '@web3-hooks/react'
import { createEvmClient } from '@web3-hooks/adapter-evm-viem'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

const client = createEvmClient({
  rpcUrl: 'https://ethereum.publicnode.com',
  chainId: 1,
})

export default function App() {
  const [qc] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={qc}>
      <Web3Provider client={client}>
        <Demo />
      </Web3Provider>
    </QueryClientProvider>
  )
}

function Demo() {
  const chain = useChainId()
  const block = useBlockNumber()
  const gas = useGasPrice()
  const bal = useBalance({ address: '0x0000000000000000000000000000000000000000' })

  return (
    <div className="p-6 font-sans space-y-2">
      <h1 className="text-xl font-semibold">web3-hooks playground</h1>
      <p>Chain ID: {chain.data}</p>
      <p>Block: {block.data}</p>
      <p>Gas Price: {gas.data?.gwei?.toFixed(2)} Gwei</p>
      <p>Balance(0x0…): {bal.data?.ether} ETH</p>
    </div>
  )
}
```

---

## Development

### Requirements
- Node.js ≥ 20
- pnpm ≥ 9
- Corepack enabled

### Setup
```bash
corepack enable
pnpm install
```

### Build all packages
```bash
pnpm -r --filter "@web3-hooks/*" build
```

### Run the Next.js playground
```bash
pnpm -F @web3-hooks/playground dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Testing
You can enable tests later in each package:

```bash
pnpm -r test
```

---

## CI/CD

GitHub Actions pipeline (`.github/workflows/ci.yml`):

```yaml
name: ci
on:
  push:
  pull_request:
jobs:
  ci:
    runs-on: ubuntu-latest
    env:
      CI: true
      NEXT_TELEMETRY_DISABLED: 1
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: corepack enable
      - run: pnpm install --frozen-lockfile
      - run: pnpm -r typecheck
      - run: pnpm -r --filter "@web3-hooks/*" build
      - run: pnpm -F @web3-hooks/playground build
```

---

## Tech Stack

- **TypeScript** — full type safety across packages  
- **pnpm workspaces** — monorepo management  
- **Next.js 15** — app playground  
- **React Query** — async state for blockchain queries  
- **viem** — low-level EVM RPC adapter  
- **tsup** — fast TypeScript bundling  

---

## Roadmap

- [ ] Add ERC-20 + ERC-721 helper hooks (`useErc20`, `useNFTMetadata`)
- [ ] Add more network adapters (Solana, Starknet)
- [ ] Add testing utilities (`mockProvider`, `renderHookWithWeb3`)
- [ ] Publish to npm (`@web3-hooks/*`)

---

## License

MIT © 2025 [Lucas Costa](https://github.com/lucascosta1996)
