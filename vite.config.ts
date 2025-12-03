import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path"; // 1. 引入 path 模块

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 或者使用 true，表示监听所有地址
    port: 5173,      // 确保端口固定为 5173（可选）
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
