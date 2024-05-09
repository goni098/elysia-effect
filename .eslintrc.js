module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module"
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "eslint-plugin-import-helpers",
    "@cspell"
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    commonjs: true,
    browser: false
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "require-await": ["error"],
    "no-return-await": ["error"],
    "no-loss-of-precision": "off",
    eqeqeq: 2,
    "@typescript-eslint/await-thenable": ["error"],
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-loss-of-precision": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-expressions": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@cspell/spellchecker": [
      "error",
      { customWordListFile: "./cspell-custom.txt" }
    ],
    "import-helpers/order-imports": [
      "error",
      {
        newlinesBetween: "always",
        groups: ["module", "/^@root/", ["parent", "sibling", "index"]],
        alphabetize: {
          order: "asc",
          ignoreCase: true
        }
      }
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ]
  }
};
