# AGENTS.md

## Purpose

- Publish the React-specific ESLint flat-config layer used by EasySQL packages.
- Compose with `@easysql/eslint-config`; do not duplicate its TypeScript or
  Prettier responsibilities here.

## Contract

- Flat config only. Keep the default export as a config array.
- Preserve `recommendedWithoutJsxA11y` as the only named export unless a new
  export is clearly necessary and additive.
- Treat current rule intent, severity, and policy as stable. No rule churn.

## React Assumptions

- Compose official flat configs from `eslint-plugin-react` and
  `eslint-plugin-jsx-a11y`.
- Keep the React 17+ JSX runtime assumption unless correctness requires a
  change.
- Keep `settings.react.version = "detect"` unless a verified consumer issue
  proves otherwise.
- Do not add app-specific file scoping. Consumers own `files` selection.

## Dependencies

- Peer ranges must stay compatible with `@easysql/eslint-config`.
- Keep runtime-imported ESLint plugins in `dependencies`, not peers.
- Keep `@easysql/eslint-config` as a local dev-only dependency for repo
  self-linting; never publish it as a dependency or peer.
- Keep `eslint` in `peerDependencies` with the broadest verified compatible
  range.
- Do not widen version ranges speculatively beyond documented support.

## Consistency

- Match the shared-tooling suite on export style, package metadata clarity, and
  README structure.
- Verify combined usage with `@easysql/eslint-config` and
  `@easysqlco/tsconfig/react` before changing package contract.

## Validation

- Keep validation lightweight: export shape, smoke composition, and pack
  contents.
- Prefer scripts and simple CI over large test harnesses.

## Extension Rules

- Add new plugins or rules only when multiple EasySQL React packages need them
  and official docs justify the change.
- Keep this package domain-agnostic and reusable.

## Anti-Patterns

- No app-specific rules, globals, or resolver settings.
- No config factories without repeated consumer need.
- No silent peerDependency drift from sibling tooling packages.
