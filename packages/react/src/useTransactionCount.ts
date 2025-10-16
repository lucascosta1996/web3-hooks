import { useQuery } from '@tanstack/react-query'
import { useWeb3Client } from './context'

export function useTransactionCount({ address, blockTag = 'latest', chainId }:{
  address: `0x${string}`; blockTag?: 'latest' | 'pending'; chainId?: number;
}) {
  const client = useWeb3Client()
  return useQuery({
    queryKey: ['txCount', address, blockTag, chainId],
    queryFn: async () => {
      const hex = await client.rpc.request<string>({
        method: 'eth_getTransactionCount',
        params: [address, blockTag],
        chainId
      })
      if (!hex?.startsWith?.('0x')) throw new Error(`Unexpected nonce: ${String(hex)}`)
      return parseInt(hex, 16)
    },
    enabled: !!address
  })
}
