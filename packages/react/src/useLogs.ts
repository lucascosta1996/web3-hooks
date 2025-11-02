import { useQuery } from '@tanstack/react-query'
import { useWeb3Client } from './context'

type Hex = `0x${string}`
export interface Log {
  address: Hex
  topics: Hex[]
  data: Hex
  blockNumber?: Hex
  transactionHash?: Hex
  logIndex?: Hex
}

export function useLogs({ fromBlock, toBlock = 'latest', address, topics, chainId }:{
  fromBlock: Hex | string; toBlock?: Hex | string; address?: Hex | Hex[]; topics?: (Hex | Hex[] | null)[]; chainId?: number;
}) {
  const client = useWeb3Client()
  return useQuery({
    queryKey: ['logs', fromBlock, toBlock, address, topics, chainId],
    queryFn: async () => {
      const logs = await client.rpc.request<Log[]>({
        method: 'eth_getLogs',
        params: [{ fromBlock, toBlock, address, topics }],
        chainId
      })
      return logs
    },
    enabled: !!fromBlock
  })
}
