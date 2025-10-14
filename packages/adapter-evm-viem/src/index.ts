import type { Web3Client, RpcClient, TxClient, ChainId } from '@web3-hooks/core';
import { createPublicClient, http, type Hex } from 'viem';
import { waitForTransactionReceipt } from 'viem/actions';

type EvmAdapterOptions = {
  rpcUrl: string;
  chainId: ChainId;
};

export function createEvmClient({ rpcUrl, chainId }: EvmAdapterOptions): Web3Client {
  // For read-only usage, we can omit a typed `chain` here; transport is enough.
  const viemClient = createPublicClient({ transport: http(rpcUrl) });

  const rpc: RpcClient = {
    async request<T>({ method, params }: { method: string; params?: unknown[] }) {
      // viem exposes a raw transport.request for custom methods
      return viemClient.transport.request({ method, params }) as Promise<T>;
    },
  };

  const tx: TxClient = {
    async sendRawTransaction({ rawTx }: { chainId: ChainId; rawTx: `0x${string}` }) {
      const hash = await rpc.request<Hex>({
        method: 'eth_sendRawTransaction',
        params: [rawTx],
      });
      return hash as `0x${string}`;
    },
    async waitForTransaction({ hash }: { chainId: ChainId; hash: `0x${string}` }) {
      const receipt = await waitForTransactionReceipt(viemClient, { hash: hash as Hex });
      return { status: receipt.status === 'success' ? 'success' : 'reverted' };
    },
  };

  return { rpc, tx };
}
