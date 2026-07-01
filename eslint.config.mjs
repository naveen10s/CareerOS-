import nextPlugin from "@next/eslint-plugin-next/dist/index.js";
import eslintConfigPrettier from "eslint-config-prettier";

const eslintConfig = [
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  eslintConfigPrettier,
];

export default eslintConfig;
