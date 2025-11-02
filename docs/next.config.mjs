import nextra from 'nextra';

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  // optional flags:
  // staticImage: true,
  // defaultShowCopyCode: true,
});

export default withNextra({
  output: 'export', // static export works great on Vercel
});