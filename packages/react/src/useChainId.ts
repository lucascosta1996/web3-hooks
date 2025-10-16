import { useQuery } from '@tanstack/react-query'
import { useWeb3Client } from './context'

export function useChainId() {
  const client = useWeb3Client()
  return useQuery({
    queryKey: ['chainId'],
    queryFn: async () => {
      const hex = await client.rpc.request<string>({ method: 'eth_chainId', params: [] })
      if (!hex?.startsWith?.('0x')) throw new Error(`Unexpected chainId: ${String(hex)}`)
      return parseInt(hex, 16)
    }
  })
}
