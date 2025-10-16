import { useQuery } from '@tanstack/react-query'
import { useWeb3Client } from './context'

type Hex = `0x${string}`
const fn = {
  name: '0x06fdde03' as const,
  symbol: '0x95d89b41' as const,
  decimals: '0x313ce567' as const,
  balanceOf: '0x70a08231' as const,
}

function pad32(hexNo0x: string) {
  return hexNo0x.padStart(64, '0')
}

function encodeBalanceOfArg(address: Hex) {
  const arg = pad32(address.slice(2).toLowerCase())
  return (`${fn.balanceOf}${arg}`) as Hex
}

function hexToBytes(hex: string): Uint8Array {
  const h = hex.startsWith('0x') ? hex.slice(2) : hex
  const out = new Uint8Array(Math.ceil(h.length / 2))
  for (let i = 0; i < out.length; i++) {
    const byte = h.slice(i * 2, i * 2 + 2) || '00'
    out[i] = parseInt(byte, 16)
  }
  return out
}

function decodeAbiString(hex: string): string {
  if (hex === '0x') return ''
  const no0x = hex.slice(2)
  if (no0x.length >= 128) {
    const len = parseInt(no0x.slice(64, 128), 16)
    const data = '0x' + no0x.slice(128, 128 + len * 2) // string is fine now
    try {
      return new TextDecoder().decode(hexToBytes(data)).replace(/\u0000+$/g, '').trim()
    } catch {}
  }
  try {
    return new TextDecoder().decode(hexToBytes(hex)).replace(/\u0000+$/g, '').trim()
  } catch {
    return ''
  }
}

export function useErc20({ token, holder, chainId, blockTag = 'latest' }:{
  token: Hex; holder?: Hex; chainId?: number; blockTag?: string;
}) {
  const client = useWeb3Client()
  return useQuery({
    queryKey: ['erc20', token, holder, chainId, blockTag],
    queryFn: async () => {
      const call = (data: Hex) =>
        client.rpc.request<Hex>({
          method: 'eth_call',
          params: [{ to: token, data }, blockTag],
          chainId
        })

      const [nameHex, symbolHex, decimalsHex, balHex] = await Promise.all([
        call(fn.name).catch(() => '0x'),
        call(fn.symbol).catch(() => '0x'),
        call(fn.decimals).catch(() => '0x'),
        holder ? call(encodeBalanceOfArg(holder)) : Promise.resolve('0x0' as Hex)
      ])

      const name = decodeAbiString(nameHex as Hex)
      const symbol = decodeAbiString(symbolHex as Hex)
      const decimals = decimalsHex && decimalsHex !== '0x' ? parseInt(decimalsHex, 16) : undefined
      const balanceWei = balHex && balHex !== '0x' ? BigInt(balHex) : 0n
      const balance = decimals !== undefined ? Number(balanceWei) / 10 ** decimals : undefined

      return { name, symbol, decimals, balanceWei, balance }
    },
    enabled: !!token
  })
}
