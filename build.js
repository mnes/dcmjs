// build.js
const esbuild = require("esbuild");

esbuild
    .build({
        entryPoints: ["src/index.js"],
        bundle: true,
        outfile: "dist/dcmjs.js",
        format: "esm"
    })
    .catch(() => process.exit(1));
