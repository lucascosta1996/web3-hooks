import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useBalance, useBlockNumber } from '@web3-hooks/react';
export default function App() {
    const address = '0x0000000000000000000000000000000000000000';
    const { data: bn } = useBlockNumber();
    const { data: bal, isLoading } = useBalance({ address });
    return (_jsxs("div", { style: { fontFamily: 'sans-serif', padding: 24 }, children: [_jsx("h1", { children: "web3-hooks \u2013 example" }), _jsxs("p", { children: ["Block: ", bn ?? '...'] }), _jsxs("p", { children: ["Balance(", address.slice(0, 10), "\u2026): ", isLoading ? 'loading' : bal ? `${bal.ether} ETH` : 'n/a'] })] }));
}
