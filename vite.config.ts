import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const norm = id.replace(/\\/g, "/");
          if (!norm.includes("node_modules")) return;
          if (norm.includes("recharts")) return "recharts";
          if (norm.includes("socket.io")) return "socket-io";
          if (norm.includes("@tanstack/react-query")) return "react-query";
          if (norm.includes("react-router")) return "react-router";
          if (norm.includes("react-dom")) return "react-dom";
          if (norm.includes("node_modules/react/")) return "react";
          if (norm.includes("@radix-ui")) return "radix-ui";
          if (norm.includes("lucide-react")) return "lucide";
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      // Geliştirmede CORS olmadan anlikaltinfiyatlari.com API kullanımı
      "/api/anlik": {
        target: "https://anlikaltinfiyatlari.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/anlik/, ""),
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
