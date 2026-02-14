module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },

  parser: "@typescript-eslint/parser",

  plugins: ["@typescript-eslint", "simple-import-sort"],

  extends: ["react-app", "react-app/jest", "plugin:prettier/recommended"],

  rules: {
    // 🔥 IMPORT SORT
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",

    // conflitos OFF
    "import/order": "off",
    "sort-imports": "off",

    // qualidade
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
};
