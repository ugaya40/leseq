import typescript from 'rollup-plugin-typescript2';


export default {
  input: "./src/index.ts",
  preserveModules: true,
  output: {
    dir: "./dist",
    format: "es",
    sourcemap: false
  },
  plugins: [
    typescript(),
  ]
}