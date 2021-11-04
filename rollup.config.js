import nodePolyfills from "rollup-plugin-polyfill-node";
import { nodeResolve as resolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";

export default [
  {
    input: "src/index.js",
    output: {
      file: "dist/esm/lamden.js",
      format: "esm",
      sourcemap: true,
    },

    plugins: [
      alias({
        entries: [{ find: "bip39", replacement: "../bip39.browser" }],
      }),
      resolve({ browser: true, preferBuiltins: false }),
      commonjs(),
      nodePolyfills(),
    ],
  },
  {
    input: "src/index.js",
    output: {
      file: "dist/cjs/lamden.js",
      format: "cjs",
      exports: "default",
      sourcemap: true,
    },
    plugins: [resolve({ preferBuiltins: true }), commonjs()],
    external: ["tweetnacl", "bip39", "ed25519-hd-key"],
  },
];
