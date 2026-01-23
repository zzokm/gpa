import nextPlugin from "eslint-config-next/core-web-vitals";

export default [
  {
    ignores: [".next/**", "out/**", "node_modules/**", "dist/**"],
  },
  ...(Array.isArray(nextPlugin) ? nextPlugin : [nextPlugin]),
];
