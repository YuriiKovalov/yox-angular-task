import js from "@eslint/js";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";
import angular from "@angular-eslint/eslint-plugin";
import angularTemplate from "@angular-eslint/eslint-plugin-template";
import angularParser from "@angular-eslint/template-parser";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  js.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { sourceType: "module" },
      globals: {
        console: "readonly",
        HTMLElement: "readonly",
      },
    },
    plugins: {
      "@angular-eslint": angular,
      "unused-imports": unusedImports,
    },
    rules: {
      ...angular.configs.recommended.rules,
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        { type: "element", prefix: "app", style: "kebab-case" },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        { type: "attribute", prefix: "app", style: "camelCase" },
      ],
      "no-console": "off",
    },
  },
  {
    files: ["**/*.html"],
    languageOptions: { parser: angularParser },
    plugins: { "@angular-eslint/template": angularTemplate },
    rules: {
      ...angularTemplate.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.spec.ts"],
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
  },
  prettier,
  {
    ignores: [
      "**/.angular/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.husky/**",
      "**/*.json",
      "**/*.scss",
    ],
  }
);
