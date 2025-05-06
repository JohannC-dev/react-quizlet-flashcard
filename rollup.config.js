import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import typescript from "rollup-plugin-typescript2";
import terser from "@rollup/plugin-terser";
import json from "@rollup/plugin-json";

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        file: "./dist/index.js",
        format: "cjs",
      },
      {
        file: "./dist/index.es.js",
        format: "es",
        exports: "named",
      },
    ],
    plugins: [
      postcss({
        plugins: [autoprefixer()],
        minimize: true,
      }),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react"],
      }),
      resolve(),
      external(),
      json(),
      terser(),
      typescript({ 
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            skipLibCheck: true
          }
        }
      }),
    ],
    external: [
      "react", 
      "react-dom", 
      "prop-types",
    ],
  },
];
