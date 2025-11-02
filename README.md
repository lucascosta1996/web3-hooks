
# Web3 Hooks — Development & Release Guide

This guide explains how to **develop**, **version**, and **publish** packages in the **web3-hooks** monorepo.

We use:

- PNPM Workspaces
- Changesets for versioning and changelogs
- NPM scoped packages under the **@web3-hooks/** organization
- Automatic multi‑package publishing

---

## Packages in This Monorepo

| Package | Description | Published Name |
|--------|-------------|----------------|
| Core Hooks | Base RPC & chain utilities | `@web3-hooks/core` |
| React Hooks | React Query–powered hooks & providers | `@web3-hooks/react` |
| EVM Adapter | Viem-based RPC adapter | `@web3-hooks/adapter-evm-viem` |
| Preset Bundler | One‑install DX bundling all above | `@web3-hooks/preset-evm` |
| Playground | Next.js example app (not published) | *(private)* |

---

# Development Flow

> All commands run from the **repo root** unless noted.

### 1) Prerequisites
- **Node.js ≥ 20**
- **pnpm ≥ 9** (via Corepack)
- **Git**

```bash
corepack enable
node -v
pnpm -v
```

### 2) Install dependencies
```bash
pnpm install
```

### 3) Build everything
```bash
pnpm -r --filter "@web3-hooks/*" build
```
- Each package outputs to `dist/`
- If a build fails, check that the package has a `tsconfig.json` extending `tsconfig.base.json`

### 4) Run the Playground (Next.js)
```bash
pnpm -F @web3-hooks/playground dev
# open http://localhost:3000
```
The playground consumes local workspace packages, so changes in `/packages/*` are reflected after a rebuild.

### 5) Develop on a specific package
```bash
# core
pnpm -F @web3-hooks/core build --watch

# react
pnpm -F @web3-hooks/react build --watch

# adapter
pnpm -F @web3-hooks/adapter-evm-viem build --watch
```
Then refresh the playground.

### 6) Typecheck, Lint, Test
```bash
# typecheck all packages
pnpm -r --filter "@web3-hooks/*" run typecheck

# lint all packages (if configured)
pnpm -r --filter "@web3-hooks/*" run lint

# test (vitest) — if/when tests exist
pnpm -r --filter "@web3-hooks/*" test
```

### 7) Adding a new hook (recommended flow)
1. Implement in the right package:
   - Reusable/shared types → `@web3-hooks/core`
   - React hook & React Query integration → `@web3-hooks/react`
   - Network/RPC specifics → `@web3-hooks/adapter-evm-viem`
2. Export it from the package’s `src/index.ts`
3. Rebuild: `pnpm -F <package> build`
4. Use it in the playground, update docs/examples

### 8) Creating a new package (e.g., preset or adapter)
```
packages/new-pkg/
  src/index.ts
  package.json
  tsconfig.json
```
**package.json (template):**
```json
{
  "name": "@web3-hooks/<name>",
  "version": "0.0.0",
  "private": false,
  "type": "module",
  "sideEffects": false,
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist", "README.md", "LICENSE"],
  "publishConfig": { "access": "public" },
  "scripts": {
    "build": "tsup src/index.ts --dts --format esm,cjs",
    "prepublishOnly": "pnpm run build"
  },
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18",
    "@tanstack/react-query": "^5.0.0"
  },
  "devDependencies": {
    "tsup": "^8.5.0",
    "typescript": "^5.9.0"
  }
}
```
**tsconfig.json (template):**
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "declaration": true,
    "outDir": "./dist",
    "module": "ESNext",
    "target": "ES2022",
    "moduleResolution": "Bundler",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src"]
}
```

### 9) Common Dev Pitfalls & Fixes
- **“No QueryClient set”** → Wrap app with `QueryClientProvider`
- **Peer dependency duplication** → React/React Query must be **peerDependencies** in `@web3-hooks/react`
- **`workspace:*` leaked to npm** → Always run `pnpm version-packages` before publish
- **tsup “compilerOptions undefined”** → Missing package-level `tsconfig.json`
- **Vite/Next showing stale code** → Ensure you’re running the correct app (`apps/playground`), and packages are rebuilt

---

# Versioning & Publishing Flow

> Changesets controls releases across packages. Only packages with pending changes are published.

## 1) Create a Changeset
```bash
pnpm changeset
```
- Select the packages you changed
- Choose bump type: **patch**, **minor**, or **major**
- Add a clear summary (used in CHANGELOG)

## 2) Apply versions & update ranges
```bash
pnpm version-packages
```
This:
- Updates versions in each `package.json`
- Rewrites internal ranges to semver
- Generates/updates CHANGELOGs
- Refreshes the lockfile

## 3) Build all publishable packages
```bash
pnpm -r --filter "@web3-hooks/*" build
```

## 4) Publish (dry run first recommended)
```bash
pnpm release --dry-run
pnpm release
```
- Publishes only changed packages
- Uses `publishConfig.access=public`
- Tags & changelogs are created automatically

---

## Choosing Bump Types (SemVer)

| Type | Use when | Examples |
|------|----------|----------|
| **patch** | Bug fix or internal improvement (no API change) | “Fix `useBalanceOf` precision” |
| **minor** | Backwards-compatible feature | “Add `useGasPrice` hook” |
| **major** | Breaking API change | “Rename `Web3Provider` prop / change return types” |

**Tip:** Prefer *minor* during active development; reserve *major* for deliberate breaking changes.

---

## (Optional) CI Automation (GitHub Actions)

Create `.github/workflows/release.yml` to open a Release PR and auto-publish on merge:

```yaml
name: ci

on:
  push:
  pull_request:
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: 🧩 Checkout repository
        uses: actions/checkout@v4

      - name: 🧱 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      # ✅ Install pnpm manually (works on all GitHub runners)
      - name: 🧰 Install pnpm
        run: npm install -g pnpm@9.12.3

      - name: 🔍 Verify pnpm installation
        run: pnpm -v

      - name: 📦 Install dependencies (frozen)
        run: pnpm install --frozen-lockfile

      - name: 🧹 Lint (non-blocking)
        run: pnpm -r lint
        continue-on-error: true

      - name: 🧾 Typecheck all workspaces
        run: pnpm -r typecheck

      - name: ⚙️ Build core packages
        run: pnpm -r --filter "@web3-hooks/*" build
```

Add `NPM_TOKEN` (Automation Token) in repo secrets.

---

## Script Reference (root)

| Command | What it does |
|--------|---------------|
| `pnpm install` | Install all workspace deps |
| `pnpm -r --filter "@web3-hooks/*" build` | Build all publishable packages |
| `pnpm changeset` | Create a changeset interactively |
| `pnpm version-packages` | Apply changesets (bump versions & ranges) |
| `pnpm release` | Build + publish changed packages |
| `pnpm release --dry-run` | Simulate publishing without uploading |
| `pnpm -F @web3-hooks/playground dev` | Run Next.js playground |

---

## Notes & Conventions

- **Peer deps**: `react`, `react-dom`, `@tanstack/react-query`, and `viem` stay as peers to avoid duplicate instances.
- **Exports**: prefer clean subpath exports for DX (`exports` field).
- **Files**: use `"files": ["dist", "README.md", "LICENSE"]` to keep published tarballs lean.
- **Consistency**: keep versions aligned when desired (e.g., preset depends on the latest released versions).
- **Docs**: update package READMEs and the docs site alongside changes.

---

## Support / Discussions

- GitHub: https://github.com/web3-hooks/web3-hooks
- Discussions: https://github.com/web3-hooks/web3-hooks/discussions

---

