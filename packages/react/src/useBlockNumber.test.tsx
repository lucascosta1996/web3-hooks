import React from 'react'
import { describe, it, expect } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { Web3Provider } from './context'
import { useBlockNumber } from './useBlockNumber'

function wrapper({ children }: any) {
  const qc = new QueryClient()
  const mockClient = {
    rpc: { request: async () => '0x10' },
    tx: { sendRawTransaction: async () => '0x', waitForTransaction: async () => ({ status: 'success' }) }
  }
  return (
    <QueryClientProvider client={qc}>
      <Web3Provider client={mockClient as any}>{children}</Web3Provider>
    </QueryClientProvider>
  )
}

describe('useBlockNumber', () => {
  it('returns parsed block number', async () => {
    const { result } = renderHook(() => useBlockNumber(), { wrapper })
    // allow first fetch
    await new Promise(r => setTimeout(r, 0))
    expect(result.current.data).toBe(16)
  })
})
