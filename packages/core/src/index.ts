export type ChainId = number;
export type Address = `0x${string}`;

export interface RpcClient {
  request<T = unknown>(args: { method: string; params?: unknown[]; chainId?: ChainId }): Promise<T>;
}

export interface TxClient {
  sendRawTransaction(args: { chainId: ChainId; rawTx: `0x${string}` }): Promise<`0x${string}`>;
  waitForTransaction(args: { chainId: ChainId; hash: `0x${string}`; confirmations?: number }): Promise<{ status: 'success' | 'reverted' }>;
}

export interface WalletConnector {
  id: string;
  name: string;
  connect(): Promise<{ address: Address; chainId: ChainId }>;
  disconnect(): Promise<void>;
  getAddress(): Address | null;
  getChainId(): ChainId | null;
  on(event: 'accountsChanged' | 'chainChanged' | 'disconnect', cb: (...a: unknown[]) => void): void;
}

export interface Web3Client { rpc: RpcClient; tx: TxClient; wallet?: WalletConnector }

export function createWeb3Client(input: Web3Client): Web3Client { return input; }
