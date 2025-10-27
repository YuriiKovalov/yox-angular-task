import js from "@eslint/js";
import tseslint from "typescript-eslint";
import angular from "@angular-eslint/eslint-plugin";
import angularTemplate from "@angular-eslint/eslint-plugin-template";
import angularParser from "@angular-eslint/template-parser";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  js.configs.recommended,

  // --- TypeScript / Angular ---
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { sourceType: "module" },
      globals: {
        console: "readonly",
        HTMLElement: "readonly"
      },
    },
    plugins: { "@angular-eslint": angular },
    rules: {
      ...angular.configs.recommended.rules,
      "@angular-eslint/component-selector": [
        "error",
        { type: "element", prefix: "app", style: "kebab-case" },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        { type: "attribute", prefix: "app", style: "camelCase" },
      ],
    },
  },

  // --- Angular Templates ---
  {
    files: ["**/*.html"],
    languageOptions: { parser: angularParser },
    plugins: { "@angular-eslint/template": angularTemplate },
    rules: {
      ...angularTemplate.configs.recommended.rules,
    },
  },

  // --- Jasmine test environment ---
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

  // --- Ignore build/cache folders ---
  prettier,
  {
    ignores: [
      "**/.angular/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.husky/**",
    ],
  }
);
