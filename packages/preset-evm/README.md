# 📦 `@web3-hooks/preset-evm`

A **drop-in preset** for `web3-hooks` that bundles the recommended hooks and EVM adapter stack into **one single install**:

✅ @web3-hooks/react  
✅ @web3-hooks/core  
✅ @web3-hooks/adapter-evm-viem  

Perfect for Ethereum-based dApps using **React + Viem**.

## 🚀 Installation

```bash
pnpm add @web3-hooks/preset-evm react react-dom @tanstack/react-query viem
# or
npm install @web3-hooks/preset-evm react react-dom @tanstack/react-query viem
```

## 🛠 Quick Start

Wrap your app with `Web3Provider` and a `QueryClientProvider`:

```tsx
"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Web3Provider,
  createEvmClient,
  useChainId,
} from "@web3-hooks/preset-evm";

const rpc = "https://ethereum.publicnode.com";

const client = createEvmClient({
  rpcUrl: rpc,
  chainId: 1,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [qc] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={qc}>
      <Web3Provider client={client}>{children}</Web3Provider>
    </QueryClientProvider>
  );
}
```

Now use hooks anywhere:

```tsx
import { useChainId, useBlockNumber, useBalanceOf } from "@web3-hooks/preset-evm";

export default function App() {
  const { data: chainId } = useChainId();
  const { data: block } = useBlockNumber();

  return (
    <div>
      <p>Connected to Chain: {chainId}</p>
      <p>Current Block: {block}</p>
    </div>
  );
}
```

## ✅ Included Hooks

| Hook | Description |
|------|-------------|
| `useChainId` | Get current chain ID |
| `useBlockNumber` | Track latest block |
| `useBalanceOf` | Fetch ERC-20 balance |
| More soon… | Wallets, contracts, ENS, gas price, events |

## 📦 What’s Inside?

```ts
export * from "@web3-hooks/core"
export * from "@web3-hooks/react"
export * from "@web3-hooks/adapter-evm-viem"
```

You can still import subpaths:

```ts
import { useBlockNumber } from "@web3-hooks/preset-evm/react";
import { createEvmClient } from "@web3-hooks/preset-evm/adapter-evm";
```

## 🧭 Roadmap

✅ Block & chain RPC hooks  
✅ ERC-20 hooks  
⬜ Wallet connection & account hooks  
⬜ ENS name/address support  
⬜ Contract read/write helpers  
⬜ Gas price tracker  
⬜ Event streaming hooks  
⬜ More adapters (Solana, Cosmos, WalletConnect, Ledger, etc.)  

You’re welcome to contribute! 💙

## 🤝 Contributing

We’d love your help!

```bash
git clone https://github.com/web3-hooks/web3-hooks
cd web3-hooks
pnpm install
pnpm dev
```

Join the conversation — PRs and ideas are welcomed!

## 📝 License

MIT © Web3 Hooks Contributors
