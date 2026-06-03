import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import babel from "vite-plugin-babel";

export default defineConfig({
  plugins: [
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
