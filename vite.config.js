import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => {
    return {
        plugins: [react(), tailwindcss()],
        ...(command === "serve"
            ? {
                  server: {
                      proxy: {
                          "/api": {
                              target: "http://127.0.0.1:8788",
                              changeOrigin: true,
                              secure: false,
                          },
                      },
                  },
              }
            : {}),
    };
});
