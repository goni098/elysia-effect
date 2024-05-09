await Bun.build({
  entrypoints: ["./src/index.ts", "./src/console/execute.ts"],
  outdir: "dist",
  target: "bun",
  sourcemap: "external"
});
