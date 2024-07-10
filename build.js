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
        target: ["node14"],
        platform: "node",
        plugins: []
    })
    .catch(() => process.exit(1));

esbuild
    .build({
        entryPoints: ["src/index.js"],
        bundle: true,
        outfile: "build/dcmjs.es.js",
        format: "esm",
        target: ["node14"],
        platform: "node",
        sourcemap: false,
        minify: false
    })
    .catch(() => process.exit(1));
