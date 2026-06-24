import nextPlugin from "eslint-config-next/core-web-vitals";
import vitest from "eslint-plugin-vitest";

const config = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "dist/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
      ".playwright/**",
      ".cursor/**",
      ".impeccable/**",
    ],
  },
  ...(Array.isArray(nextPlugin) ? nextPlugin : [nextPlugin]),
  {
    files: ["**/*.{test,spec}.{ts,tsx}"],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/preserve-manual-memoization": "off",
    },
  },
  {
    files: ["scripts/**"],
    rules: {
      "no-console": "off",
    },
  },
];

export default config;
