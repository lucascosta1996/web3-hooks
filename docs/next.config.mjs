// docs/next.config.mjs
import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

export default withNextra({
  output: 'export',
  // 👇 disable Image Optimization API (not supported in static export)
  images: { unoptimized: true },
})