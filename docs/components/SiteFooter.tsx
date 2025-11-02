// docs/components/SiteFooter.tsx
export default function SiteFooter() {
  return (
    <footer
      id="site-footer"
      style={{
        padding: '44px 0',
        borderTop: '1px solid rgba(127,127,127,0.2)',
        fontSize: 12,
        opacity: 0.8,
        textAlign: 'center'
      }}
    >
      © {new Date().getFullYear()} <a href="https://lucascosta.dev" target="_blank" rel="noreferrer">Lucas Costa</a>.{' '}
      Released under the{' '}
      <a
        href="https://github.com/lucascosta1996/web3-hooks/blob/main/LICENSE"
        target="_blank"
        rel="noreferrer"
      >
        MIT License
      </a>.
    </footer>
  );
}