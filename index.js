import reactPlugin from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import hooksPlugin from "eslint-plugin-react-hooks";

export default [
  // Base React rules (flat config)
  reactPlugin.configs.flat.recommended,

  // React 17+ JSX runtime (no need for React import)
  reactPlugin.configs.flat["jsx-runtime"],

  // Accessibility rules
  jsxA11y.flatConfigs.recommended,

  // Hooks plugin
  {
    plugins: {
      "react-hooks": hooksPlugin,
    },
    rules: {
      // Hooks must always remain strict (bug prevention)
      ...hooksPlugin.configs.recommended.rules,

      // Remove legacy rule (React import not required)
      "react/react-in-jsx-scope": "off",

      // Optional: reduce noise in React components
      "react/prop-types": "off", // since you use TS occasionally
      "react/jsx-boolean-value": ["warn", "never"],
      "react/self-closing-comp": "warn",
    },

    // Common ignore patterns
    ignores: [
      "*.test.tsx",
      "*.stories.tsx",
      "dist/**",
      "build/**",
    ],
  },
];
