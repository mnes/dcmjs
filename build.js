// build.js
const esbuild = require("esbuild");

esbuild
    .build({
        entryPoints: ["src/index.js"],
        bundle: true,
        outfile: "build/dcmjs.js",
        format: "esm",
        sourcemap: true,
        minify: true,
        target: ["es6"],
        platform: "browser",
        plugins: []
    })
    .catch(() => process.exit(1));
