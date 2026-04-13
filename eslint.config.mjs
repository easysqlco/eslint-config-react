import eslintConfig, { tsLanguageOptions } from "@easysql/eslint-config";

export default [
  ...eslintConfig,
  {
    languageOptions: tsLanguageOptions({
      project: "tsconfig.eslint.json",
    }),
  },
];
