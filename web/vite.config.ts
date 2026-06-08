import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import babel from "vite-plugin-babel";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    // I needed it for mobx decorators as esbuild wasn't transpiling them
    // I don't use decorators anymore, check if could be safely removed
    babel({
      include: /\.ts$/,
      babelConfig: {
        presets: [["@babel/preset-typescript"]],
        plugins: [
          ["@babel/plugin-proposal-decorators", { version: "2023-11" }],
        ],
      },
    }),
    react(),
  ],
});
