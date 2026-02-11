import sharedConfig from "@webtoon-hub/eslint-config";

export default [
  ...sharedConfig,
  {
    ignores: ["apps/**", "packages/**", "node_modules/**", "dist/**"]
  }
];
