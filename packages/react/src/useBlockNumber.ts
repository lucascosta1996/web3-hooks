import { useQuery } from '@tanstack/react-query';
import { useWeb3Client } from './context';

export function useBlockNumber({ chainId, refetchInterval = 10_000 }: { chainId?: number; refetchInterval?: number } = {}) {
  const client = useWeb3Client();
  return useQuery({
    queryKey: ['blockNumber', chainId],
    queryFn: async () => {
      const hex = await client.rpc.request<string>({ method: 'eth_blockNumber', params: [], chainId });
      return parseInt(hex, 16);
    },
    refetchInterval
  });
}
