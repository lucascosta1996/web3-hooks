import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Web3Provider } from '@web3-hooks/react'
import { createEvmClient } from '@web3-hooks/adapter-evm-viem'
import App from './App'

const qc = new QueryClient()
const client = createEvmClient({
  rpcUrl: 'https://ethereum.publicnode.com', // swap to your provider
  chainId: 1
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <Web3Provider client={client}>
        <App />
      </Web3Provider>
    </QueryClientProvider>
  </React.StrictMode>
)
