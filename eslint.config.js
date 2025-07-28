import babelParser from "@babel/eslint-parser";
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";

export default {
  plugins: {
    react: reactPlugin,
    import: importPlugin,
  },
  languageOptions: {
    parser: babelParser,
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      window: true,
      document: true,
      console: true,
    },
  },

  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "import/no-unresolved": "error",
    "import/order": ["warn", { "newlines-between": "always" }],
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
};
