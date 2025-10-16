'use client'

import {
  useBlockNumber,
  useChainId,
  useGasPrice,
  useBalance,
} from '@web3-hooks/react'

export default function Page() {
  const chain = useChainId()
  const block = useBlockNumber()
  const gas = useGasPrice()
  const bal = useBalance({
    address: '0x0000000000000000000000000000000000000000',
  })

  return (
    <div className="p-8 font-sans space-y-3">
      <h1 className="text-2xl font-semibold">web3-hooks playground</h1>
      <p>Chain ID: {chain.data}</p>
      <p>Block: {block.data}</p>
      <p>Gas Price: {gas.data?.gwei?.toFixed(2)} Gwei</p>
      <p>Balance(0x0…): {bal.data?.ether} ETH</p>
    </div>
  )
}
