import eslintConfig, { tsLanguageOptions } from "@easysqlco/eslint-config";

export default [
  ...eslintConfig,
  {
    languageOptions: tsLanguageOptions({
      project: "tsconfig.eslint.json",
    }),
  },
];
