import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/components/AutoGrowTextarea.tsx",
    "src/components/AutoWidthInput.tsx"
  ],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ["esm", "cjs"],
  target: "es2019",
  minify: false,
});