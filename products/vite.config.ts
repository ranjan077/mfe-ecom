import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    federation({
      name: "products",
      filename: "remoteEntry.js",
      exposes: {
        "./ProductList": "./src/App.tsx",
      },
      dts: false,
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^19.2.8",
        },
        "react/": {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^19.2.8",
        },
      },
    }),
    react(),
  ],
  base: "http://localhost:3001",
  server: {
    port: 3001,
    strictPort: true,
    origin: "http://localhost:3001",
  },
  build: {
    target: "chrome89",
  },
});
