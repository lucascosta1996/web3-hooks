import { useQuery } from '@tanstack/react-query'
import { useWeb3Client } from './context'

export function useCode({ address, blockTag = 'latest', chainId }:{
  address: `0x${string}`; blockTag?: string; chainId?: number;
}) {
  const client = useWeb3Client()
  return useQuery({
    queryKey: ['code', address, blockTag, chainId],
    queryFn: async () => {
      const code = await client.rpc.request<string>({
        method: 'eth_getCode',
        params: [address, blockTag],
        chainId
      })
      return code // '0x' if EOA, bytecode if contract
    },
    enabled: !!address
  })
}
