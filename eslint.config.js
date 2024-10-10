import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.browser, // Include browser globals
      parser: tsParser, // Use the TypeScript parser
      ecmaVersion: "latest", // ECMAScript version
      sourceType: "module", // Use ES modules
      parserOptions: {
        project: "./tsconfig.json", // Path to tsconfig.json
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint, // Use the TypeScript plugin
      prettier, // Prettier as an object
    },
    rules: {
      "max-len": "off",
      "require-jsdoc": "off",
      "import/no-cycle": "off",
      "linebreak-style": 0,
      "no-param-reassign": 0,
      "no-shadow": "off",
      "@typescript-eslint/no-var-requires": 0,
      "import/extensions": 0,
      "@typescript-eslint/ban-ts-ignore": "off",
      indent: "off",
      "@typescript-eslint/ban-types": "off",
      "func-names": ["error", "never"],
      "arrow-parens": [2, "as-needed"],
      "arrow-body-style": ["error", "as-needed"],
      "no-underscore-dangle": [
        "error",
        {
          allow: ["__filename", "__dirname"],
        },
      ],
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1, // Allows only one blank line
          maxEOF: 0, // No blank lines at the end of the file
          maxBOF: 0, // No blank lines at the beginning of the file
        },
      ],
      // "prettier/prettier": ["error"],
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    rules: pluginJs.configs.recommended.rules,
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: tseslint.configs["recommended-type-checked"].rules,
  },
];
