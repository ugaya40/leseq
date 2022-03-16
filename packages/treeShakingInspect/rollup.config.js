import {visualizer} from 'rollup-plugin-visualizer';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser"
import commonjs from '@rollup/plugin-commonjs';


export default {
  input: "./src/index.ts",
  output: {
    file: "./dist/index.js",
    format: "es",
    sourcemap: true
  },
  external: [],
  plugins: [
    visualizer({open: true,gzipSize: true}),
    terser(),
    typescript({clean: true}),
    nodeResolve(),
    commonjs()
  ]
}