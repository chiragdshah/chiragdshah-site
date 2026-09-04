# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Deploy

Site deploys automatically via Netlify on push to `main` (Netlify project `chiragdshah`).

## Build cost & the docs-only guard

Netlify meters **production deploys at 15 credits each**, flat -- a README commit costs the
same as a real release. Traffic is negligible by comparison.

`netlify.toml` sets `ignore = "bash scripts/netlify-ignore.sh"`. That script skips the build
when a commit touches only root-level `*.md` files or `.claude/`, and builds otherwise.

**Do not inline a git exclude pathspec in `netlify.toml`.** A first attempt used
`git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF -- . ':(exclude,glob)*.md'` directly as the
`ignore` value. It works in a local shell and fails in Netlify CI: the pathspec is mangled
between TOML and the shell, git reports **no differences at all**, and every deploy is
silently skipped -- including real source changes. Verified by probe on 2026-09-04: a plain
two-ref diff builds correctly; the same diff with an inline exclude pathspec skips a real
source change. The failure mode is invisible -- builds just quietly stop.

Rules that follow:

- **Keep the logic in `scripts/netlify-ignore.sh`.** Plain filename matching, no pathspec magic.
- **Fail open.** Missing refs or a git error must exit non-zero (build). A guard that fails
  closed stops all deploys with no error anywhere.
- **A cold cache hands back `CACHED_COMMIT_REF` == `COMMIT_REF`.** Any diff between them is
  empty, so a naive guard skips. The script tests for equality and builds. This hit four
  sites at once on 2026-09-04 -- all whose last successful build was months old.
- **`ignore` only works with Netlify's native Git integration.** It does *not* cancel builds
  triggered by a build hook; those need `[skip netlify]` commit tokens instead.

Canceled and failed builds cost **0 credits** -- only a successful production deploy is
metered. "Canceled build due to no content change" is normal: identical output means no
redeploy and no charge, and the previous deploy correctly keeps the Published badge.
