import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
  globalIgnores(["dist/"]),
  {
    files: ["**/*.{js}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: { ...globals.node },
      sourceType: "commonjs"

    },
  },
]);
