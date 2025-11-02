// docs/pages/index.tsx
import Head from 'next/head'
import Link from 'next/link'

import { Bitcount_Prop_Single } from 'next/font/google';

const bitCount = Bitcount_Prop_Single({
  subsets: ['latin'],
  weight: ['400'], // e.g., bold for logo
});

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Web3 Hooks</title>
        <meta name="description" content="A modular React hooks library for Web3 development." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="viewport">
        {/* subtle background */}
        <div className="bg">
          <div className="grid" />
          <div className="radial" />
        </div>

        {/* content */}
        <section className="hero">
          <div className="brand">
            <div className="logo">w</div>
            <h1 className="title">
              Web3-<span className="grad">Hooks</span>
            </h1>
          </div>

          <p className="tagline">
            Modular React hooks for Web3 — <br className="br" />adapter-driven, framework-agnostic, DX-first.
          </p>

          <div className="flex items-center justify-center cta">
            <Link href="/docs/getting-started" className="btn primary">Docs</Link>
            <a
              href="https://github.com/lucascosta1996/web3-hooks"
              target="_blank"
              rel="noreferrer"
              className="btn ghost"
            >
              GitHub
            </a>
          </div>

          <div className="badges">
            <Link href="/docs/preset-evm" className="chip">Preset EVM</Link>
            <span className="dot">•</span>
            <Link href="/docs/react" className="chip">React Query</Link>
            <span className="dot">•</span>
            <Link href="/docs/adapter-evm-viem" className="chip">Viem adapter</Link>
          </div>

          <div className="meta">
            MIT Licensed · Open Source
          </div>
        </section>
      </main>

      <style jsx global>{`
  html, body, #__next {
    height: 100%;
    overflow: hidden; /* 🚫 no scroll */
    background: #0b0b0c;
    color: #e7e7ea;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  * { box-sizing: border-box; }
  ::selection { background: rgba(200, 200, 200, 0.25); }
`}</style>

<style jsx>{`
  @import url('https://fonts.googleapis.com/css2?family=Bitcount+Prop+Single:wght@100..900&display=swap');

  .viewport {
    position: relative;
    height: 100%;
    width: 100%;
    display: grid;
    place-items: center;
    isolation: isolate;
  }

  /* background layers */
  .bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: -2;
  }
  .grid {
    position: absolute;
    inset: -10%;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.055) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.055) 1px, transparent 1px);
    background-size: 32px 32px, 32px 32px;
    mask-image: radial-gradient(60% 60% at 50% 50%, black 40%, transparent 100%);
    opacity: 0.22;
  }
  .radial {
    position: absolute;
    inset: -25%;
    background: radial-gradient(
      60% 40% at 50% 50%,
      rgba(230,230,230,0.12) 0%,
      rgba(180,180,180,0.07) 35%,
      transparent 70%
    );
    filter: blur(34px);
    z-index: -1;
  }

  .hero {
    width: min(960px, 92vw);
    display: grid;
    justify-items: center;
    text-align: center;
    gap: 22px;
    user-select: none;
  }

  .brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }

  /* Carbon Mist logo */
  .logo {
    width: 64px; height: 64px;
    display: grid; place-items: center;
    border-radius: 16px;
    background: conic-gradient(from 140deg, #4a4a4a, #6e6e6e, #a3a3a3, #6e6e6e, #4a4a4a);
    box-shadow: 0 8px 30px rgba(100, 100, 100, 0.45);
    color: #fff;
    animation: spin 8s linear infinite paused;
    font-family: "Bitcount Prop Single", system-ui;
    font-weight: 400;
    font-size: 34px;
    text-align: center;
  }
  .logo:hover { animation-play-state: running; }

  .title {
    margin: 0;
    font: 800 clamp(28px, 6vw, 56px) / 1.05 ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial;
    letter-spacing: -0.02em;
    font-family: "Bitcount Prop Single", system-ui;
    font-weight: 400;
  }

  /* grayscale accent instead of colorful rainbow */
  .grad {
    background: linear-gradient(90deg, #f2f2f2, #bdbdbd 55%, #8a8a8a);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0 0 20px rgba(180, 180, 180, 0.18);
  }

  .tagline {
    margin: 0;
    opacity: 0.85;
    font: 500 clamp(14px, 2.4vw, 18px) / 1.6 ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial;
  }
  .br { display: none; }
  @media (max-width: 520px) {
    .br { display: inline; }
  }

  .cta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 2px;
  }
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    padding: 0 18px;
    border-radius: 12px;
    font: 600 14px/1 ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter;
    text-decoration: none;
    transition: transform 120ms ease, background 120ms ease, border-color 120ms ease, box-shadow 120ms ease;
    border: 1px solid rgba(255,255,255,0.14);
    color: #e7e7ea;
    backdrop-filter: saturate(1.15) blur(4px);
    box-shadow: 0 8px 20px rgba(30, 30, 30, 0.35);
  }
  .btn:hover { transform: translateY(-1px); }

  /* Primary = silver pill */
  .primary {
    background: linear-gradient(90deg, #e9e9e9, #bfbfbf);
    border-color: transparent;
    color: #131316;
    box-shadow: 0 10px 26px rgba(190, 190, 190, 0.28);
  }
  .primary:hover {
    background: linear-gradient(90deg, #f2f2f2, #c9c9c9);
    box-shadow: 0 12px 30px rgba(200, 200, 200, 0.36);
  }

  /* Ghost = subtle overlay */
  .ghost {
    background: rgba(255,255,255,0.05);
  }
  .ghost:hover {
    background: rgba(255,255,255,0.08);
  }

  .badges {
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
    align-items: center;
    opacity: 0.9;
  }
  .chip {
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    font: 600 12px/1 ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter;
    box-shadow: 0 4px 14px rgba(22, 22, 22, 0.28);
  }

  .chip:hover {
    opacity: 0.6;
  }

  .dot { opacity: 0.35; }

  .meta {
    margin-top: 2px;
    opacity: 0.62;
    font: 500 12px/1.6 ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter;
  }

  @keyframes spin {
    to { transform: rotate(1turn); }
  }
`}</style>
    </>
  )
}