import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // Disable img element warning - using native img for dynamic external URLs
      "@next/next/no-img-element": "off",
      // Disable exhaustive-deps warning - many intentional omissions in codebase
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];

export default eslintConfig;
