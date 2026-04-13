# @easysqlco/eslint-config-react

Shared React ESLint flat config for EasySQL packages.

This package is the React-specific layer in the EasySQL tooling suite. It
bundles the React ESLint plugins it imports and is meant to be composed with
`@easysqlco/eslint-config`, which owns the shared TypeScript and Prettier
integration.

## Installation

Typical EasySQL usage installs both shared config packages:

```bash
npm install --save-dev @easysqlco/eslint-config @easysqlco/eslint-config-react eslint
```

## Usage

Typical EasySQL React package setup:

```js
import path from "node:path";
import { fileURLToPath } from "node:url";
import eslintConfig, { tsLanguageOptions } from "@easysqlco/eslint-config";
import eslintConfigReact from "@easysqlco/eslint-config-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  ...eslintConfig,
  ...eslintConfigReact,
  {
    languageOptions: tsLanguageOptions({ tsconfigRootDir: __dirname }),
  },
];
```

## Exports

- `default`: React + hooks + JSX runtime + `jsx-a11y` config.
- `recommendedWithoutJsxA11y`: same React contract without `jsx-a11y`.

## Notes

- Flat config only. ESLint legacy config is out of scope.
- This package does not add TypeScript parser setup. Consumers should compose it
  with `@easysqlco/eslint-config`.
- React plugin dependencies are bundled here so consumers do not need to manage
  them separately.
- `files` scoping stays in the consumer config so packages can decide their own
  lint surface.
- `@easysqlco/eslint-config` is a dev-only dependency in this repo and an
  optional peer for consumers. It is not a runtime dependency of the published
  package.
