import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Web3Provider } from '@web3-hooks/react';
import { createEvmClient } from '@web3-hooks/adapter-evm-viem';
import App from './App';
const qc = new QueryClient();
const client = createEvmClient({
    rpcUrl: 'https://rpc.ankr.com/eth', // swap to your provider
    chainId: 1
});
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(QueryClientProvider, { client: qc, children: _jsx(Web3Provider, { client: client, children: _jsx(App, {}) }) }) }));
