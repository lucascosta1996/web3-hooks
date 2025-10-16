import { useQuery } from '@tanstack/react-query'
import { useWeb3Client } from './context'

export function useGasPrice() {
  const client = useWeb3Client()
  return useQuery({
    queryKey: ['gasPrice'],
    queryFn: async () => {
      const hex = await client.rpc.request<string>({ method: 'eth_gasPrice', params: [] })
      if (!hex?.startsWith?.('0x')) throw new Error(`Unexpected gasPrice: ${String(hex)}`)
      const wei = BigInt(hex)
      const gwei = Number(wei) / 1e9
      return { wei, gwei }
    },
    refetchInterval: 10_000
  })
}
