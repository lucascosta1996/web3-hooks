// eslint.config.js (ESLint v9 flat config)
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  // ✅ Globally ignore build outputs, caches, vendor bundles, etc.
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.next/**',         // all Next.js build dirs
      'docs/.next/**',       // (explicit docs)
      '**/.turbo/**',
      '**/.vercel/**',
      '**/.cache/**',
      '**/.pnpm-store/**',
      '**/vendor/**',
      '**/vendor-chunks/**',
      '**/*.d.ts',           // optional: ignore generated d.ts
    ],
  },

  // Base JS rules
  js.configs.recommended,

  // TS + React rules applied ONLY to your source folders
  ...tseslint.config({
    files: [
      'packages/**/*.{ts,tsx,js,jsx}',
      'apps/**/*.{ts,tsx,js,jsx}',
      // Add more source roots if needed, e.g.:
      // 'examples/**/*.{ts,tsx,js,jsx}',
      // 'docs/pages/**/*.{ts,tsx,js,jsx}' // if you want to lint docs pages
    ],
    extends: [
      ...tseslint.configs.recommended
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.base.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: { react: { version: 'detect' } },
    plugins: { react, 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/react-in-jsx-scope': 'off',
    },
  }),
]