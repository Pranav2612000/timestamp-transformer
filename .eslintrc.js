module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  plugins: ["react"],
  globals: { test: true, expect: true },
  rules: {
    "no-underscore-dangle": "off",
    "no-new": "off",
    "no-unused-expressions": ["error", { allowShortCircuit: true }],
    "class-methods-use-this": ["error", { enforceForClassFields: false }],
  },
};
