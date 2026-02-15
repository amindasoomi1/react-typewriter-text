import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts({ entryRoot: "src", outDir: "dist" })],
  resolve: {
    alias: {
      // eslint-disable-next-line
      // @ts-ignore
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      name: "use-otp-autofill",
      entry: "src/index.tsx",
      formats: ["es", "cjs"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: { globals: { react: "React", "react-dom": "ReactDOM" } },
    },
  },
});
