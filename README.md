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
same as a real release. Traffic is negligible by comparison: bandwidth, web requests and
compute together run under 5% of the monthly allowance across all of Chirag's sites.

`netlify.toml` carries an `ignore` command that skips the build when a commit touches only
root-level docs (`*.md`) or `.claude/`.

Three things to preserve if you edit it:

- **Quote `$CACHED_COMMIT_REF`, and check it before use.** Unquoted and empty (which is what
  a cold cache gives you), `git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF -- .` collapses
  into a *working-tree* diff -- always empty in CI -- returns 0, and silently skips **every**
  deploy. It fails closed, not open. Hence the leading `test -z ... && exit 1`.
- **Use `:(exclude,glob)*.md`, never `:(exclude)*.md`.** Plain `:(exclude)` matches at any
  depth and will swallow nested files the site actually ships, skipping builds that matter.
  The `glob` magic stops `*` from crossing `/`.
- **Validate after editing.** `netlify build --dry` parses `netlify.toml` and catches malformed
  TOML before CI does.

`ignore` only works with Netlify's **native Git integration**. It does *not* cancel builds
triggered by a build hook -- a repo wired through a GitHub Action + build hook needs
`[skip netlify]` commit tokens instead.

Canceled and failed builds cost **0 credits** -- only a *successful production deploy* is
metered. "Canceled build due to no content change" is normal and desirable: identical output
means no redeploy and no charge, and the previous deploy correctly keeps the Published badge.
