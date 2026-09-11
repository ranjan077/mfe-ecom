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
        // react-redux creates its context at module scope. Two copies in the
        // page means the host's <Provider> and a remote's useSelector talk to
        // different context objects, and the remote throws on mount. This must
        // stay a singleton, and must stay identical in all three configs.
        "react-redux": {
          singleton: true,
          requiredVersion: "^9.3.0",
        },
        // Shared to dedupe bytes and keep one Immer instance. Not required for
        // correctness: actions are plain objects and reducers are pure.
        "@reduxjs/toolkit": {
          singleton: true,
          requiredVersion: "^2.12.0",
        },
        redux: {
          singleton: true,
          requiredVersion: "^5.0.1",
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
