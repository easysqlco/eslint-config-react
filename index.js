import reactPlugin from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import hooksPlugin from "eslint-plugin-react-hooks";

const reactCoreConfigs = [
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
];

const reactSharedConfig = {
  name: "@easysql/eslint-config-react/shared",
  plugins: {
    "react-hooks": hooksPlugin,
  },
  rules: {
    // Keep the published rule contract stable for existing consumers.
    ...hooksPlugin.configs.recommended.rules,
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-boolean-value": ["warn", "never"],
    "react/self-closing-comp": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignores: ["*.test.tsx", "*.stories.tsx", "dist/**", "build/**"],
};

export const recommendedWithoutJsxA11y = [
  ...reactCoreConfigs,
  reactSharedConfig,
];

export default [...recommendedWithoutJsxA11y, jsxA11y.flatConfigs.recommended];
