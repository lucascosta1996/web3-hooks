import { useQuery } from '@tanstack/react-query'
import { useWeb3Client } from './context'

export function useStorageAt({ address, slot, blockTag = 'latest', chainId }:{
  address: `0x${string}`; slot: `0x${string}`; blockTag?: string; chainId?: number;
}) {
  const client = useWeb3Client()
  return useQuery({
    queryKey: ['storageAt', address, slot, blockTag, chainId],
    queryFn: async () => {
      const data = await client.rpc.request<string>({
        method: 'eth_getStorageAt',
        params: [address, slot, blockTag],
        chainId
      })
      return data // hex-encoded 32-byte slot
    },
    enabled: !!address && !!slot
  })
}
