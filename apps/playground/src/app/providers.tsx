'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Web3Provider } from '@web3-hooks/react'
import { createEvmClient } from '@web3-hooks/adapter-evm-viem'
import { ReactNode, useState } from 'react'

// Create the EVM RPC client
const evmClient = createEvmClient({
  rpcUrl: 'https://ethereum.publicnode.com',
  chainId: 1,
})

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Web3Provider client={evmClient}>{children}</Web3Provider>
    </QueryClientProvider>
  )
}
