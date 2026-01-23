import nextPlugin from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [".next/**", "out/**", "node_modules/**", "dist/**"],
  },
  ...(Array.isArray(nextPlugin) ? nextPlugin : [nextPlugin]),
];

export default config;
