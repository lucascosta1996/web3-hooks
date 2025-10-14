import React from 'react';
import type { Web3Client } from '@web3-hooks/core';

const Ctx = React.createContext<Web3Client | null>(null);

export function Web3Provider({ client, children }: { client: Web3Client; children: React.ReactNode }) {
  return <Ctx.Provider value={client}>{children}</Ctx.Provider>;
}

export function useWeb3Client() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error('Web3Provider missing');
  return ctx;
}
