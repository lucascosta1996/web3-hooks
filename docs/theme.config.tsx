import { Bitcount_Prop_Single } from 'next/font/google';

const bitCount = Bitcount_Prop_Single({
  subsets: ['latin'],
  weight: ['400'], // e.g., bold for logo
});

function MyFooter() {
  return (
    <div style={{ fontSize: 12, opacity: 0.7 }}>
      © {new Date().getFullYear()} <a href="https://lucascosta.dev">Lucas Costa</a>.
      Released under the <a href="https://github.com/lucascosta1996/web3-hooks/blob/main/LICENSE">MIT License</a>.
    </div>
  )
}

export default {
  logo: <i className={bitCount.className}>Web3-Hooks</i>,
  project: { link: 'https://github.com/lucascosta1996/web3-hooks' },
  docsRepositoryBase: 'https://github.com/lucascosta1996/web3-hooks/docs',

  useNextSeoProps() {
    return {
      titleTemplate: '%s - Web3-Hooks',
      defaultTitle: 'Web3-Hooks',
      description: 'Composable React hooks for Web3 development with modular adapters and presets.',
      openGraph: {
        title: 'Web3-Hooks',
        description: 'Composable React hooks for Web3 development with modular adapters and presets.',
        url: 'https://web3-hooks.io',
        siteName: 'Web3-Hooks',
        images: [
          {
            url: 'https://i.ibb.co/6R0cJ7Gn/web3hooks.png',
            width: 1200,
            height: 630,
            alt: 'Web3-Hooks',
          },
        ],
        type: 'website',
      },
      twitter: {
        cardType: 'summary_large_image',
        site: '@web3_hooks',
        title: 'Web3-Hooks',
        description: 'Composable React hooks for Web3 development.',
        image: 'https://i.ibb.co/6R0cJ7Gn/web3hooks.png',
      },
      additionalMetaTags: [
        { name: 'robots', content: 'index,follow' },
        { name: 'theme-color', content: '#101010' },
      ],

    };
  },

  head: (
    <>
      <meta name="theme-color" content="#000000" />
      <meta name="description" content="Web3 Hooks — Modular React Hooks for Web3 development." />
      <meta property="og:title" content="Web3 Hooks" />
      <meta
        property="og:description"
        content="A modular React hooks library for Web3 development — composable, type-safe, and adapter-agnostic."
      />
      <meta property="og:image" content="https://i.ibb.co/6R0cJ7Gn/web3hooks.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Web3 Hooks" />
      <meta
        name="twitter:description"
        content="Composable React Hooks for Web3 development — EVM, Viem, and beyond."
      />
    </>
  )
};