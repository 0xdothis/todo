import js from "@eslint/js";
import tseslint from "typescript-eslint";
// You can also use import { configs } from "@typescript-eslint/eslint-plugin"
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        //project: "./tsconfig.json",
        //tsconfigRootDir: import.meta.dirname,
        projectService: true,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];

