import { useQuery } from '@tanstack/react-query';
import { useWeb3Client } from './context';

export function useBalance({ address, chainId }: { address: `0x${string}`; chainId?: number }) {
  const client = useWeb3Client();
  return useQuery({
    queryKey: ['balance', address, chainId],
    queryFn: async () => {
      const hex = await client.rpc.request<string>({ method: 'eth_getBalance', params: [address, 'latest'], chainId });
      const wei = BigInt(hex);
      return { wei, ether: Number(wei) / 1e18 };
    },
    enabled: !!address
  });
}
