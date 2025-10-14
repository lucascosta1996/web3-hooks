import { useBalance, useBlockNumber } from '@web3-hooks/react'

export default function App() {
  const address = '0x0000000000000000000000000000000000000000' as const
  const { data: bn } = useBlockNumber()
  const { data: bal, isLoading } = useBalance({ address })

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>web3-hooks – example</h1>
      <p>Block: {bn ?? '...'}</p>
      <p>
        Balance({address.slice(0, 10)}…): {isLoading ? 'loading' : bal ? `${bal.ether} ETH` : 'n/a'}
      </p>
    </div>
  )
}
