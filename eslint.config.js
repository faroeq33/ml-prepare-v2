import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginJs from "@eslint/js";
import pluginReactRefresh from "eslint-plugin-react-refresh";

const tsConfig = tseslint.config(
  ...tseslint.configs.recommended
);

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        React: true
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      "react": pluginReact,
      "react-refresh": pluginReactRefresh
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  pluginJs.configs.recommended,
  ...tsConfig,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      "react-refresh/only-export-components": [
        "warn",
        { 
          allowConstantExport: true,
          allowExportNames: ["metadata"]
        }
      ],
      ...pluginReact.configs.recommended.rules
    }
  }
];
