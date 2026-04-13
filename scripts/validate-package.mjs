import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { ESLint } from "eslint";
import recommended, { recommendedWithoutJsxA11y } from "../index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const packageJson = JSON.parse(
  await readFile(path.join(rootDir, "package.json"), "utf8"),
);

const filesConfig = {
  files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
};

assert(
  Array.isArray(recommended),
  "default export must be a flat config array",
);
assert(
  Array.isArray(recommendedWithoutJsxA11y),
  "recommendedWithoutJsxA11y must be a flat config array",
);
assert.equal(
  recommended.length,
  recommendedWithoutJsxA11y.length + 1,
  "default export should only add the jsx-a11y config",
);
assert.deepEqual(Object.keys(packageJson.dependencies).sort(), [
  "eslint-plugin-jsx-a11y",
  "eslint-plugin-react",
  "eslint-plugin-react-hooks",
]);
assert.equal(
  packageJson.dependencies["@easysql/eslint-config"],
  undefined,
  "@easysql/eslint-config must not be published as a runtime dependency",
);
assert.equal(
  packageJson.peerDependencies["@easysql/eslint-config"],
  undefined,
  "@easysql/eslint-config must not be a published peer dependency",
);
assert.equal(
  packageJson.devDependencies["@easysql/eslint-config"],
  "^0.0.22",
  "@easysql/eslint-config should stay a dev-only dependency for self-linting",
);
assert.deepEqual(Object.keys(packageJson.peerDependencies).sort(), ["eslint"]);
assert.equal(
  packageJson.peerDependencies.eslint,
  ">= 9.7 < 10",
  "eslint peer range must stay aligned with sibling tooling packages",
);

const recommendedEslint = new ESLint({
  overrideConfig: [filesConfig, ...recommended],
  overrideConfigFile: true,
});
const recommendedConfig =
  await recommendedEslint.calculateConfigForFile("src/example.tsx");

assert(
  recommendedConfig.rules["react/react-in-jsx-scope"],
  "react config should include the React runtime override",
);
assert(
  recommendedConfig.rules["jsx-a11y/alt-text"],
  "default export should include jsx-a11y rules",
);

const reactOnlyEslint = new ESLint({
  overrideConfig: [filesConfig, ...recommendedWithoutJsxA11y],
  overrideConfigFile: true,
});
const reactOnlyConfig =
  await reactOnlyEslint.calculateConfigForFile("src/example.tsx");

assert(
  reactOnlyConfig.rules["react-hooks/rules-of-hooks"],
  "React-only export should include hooks rules",
);
assert.equal(
  reactOnlyConfig.rules["jsx-a11y/alt-text"],
  undefined,
  "recommendedWithoutJsxA11y must not include jsx-a11y rules",
);

const packOutput = execFileSync("npm", ["pack", "--dry-run", "--json"], {
  cwd: rootDir,
  encoding: "utf8",
});
const [{ files: packedFiles }] = JSON.parse(packOutput);
const packedPaths = new Set(packedFiles.map((file) => file.path));

for (const requiredPath of [
  "AGENTS.md",
  "LICENSE",
  "README.md",
  "index.d.ts",
  "index.js",
  "package.json",
]) {
  assert(packedPaths.has(requiredPath), `${requiredPath} must be published`);
}

for (const excludedPath of ["scripts/validate-package.mjs", "tsconfig.json"]) {
  assert(
    !packedPaths.has(excludedPath),
    `${excludedPath} should stay out of the published package`,
  );
}

process.stdout.write("Package validation passed.\n");
