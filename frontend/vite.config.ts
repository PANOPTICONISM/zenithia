import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({ open: true })],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@mui") || id.includes("@emotion")) return "mui";
            if (id.includes("@fullcalendar")) return "fullcalendar";
            if (id.includes("@nivo")) return "nivo";
            if (id.includes("luxon")) return "luxon";
            if (id.includes("axios")) return "axios";
            if (id.includes("lodash")) return "lodash";
            if (id.includes("hello-pangea")) return "hello-pangea";
            if (id.includes("react-toastify")) return "toastify";
            if (id.includes("uuid")) return "uuid";
            if (id.includes("react-google-recaptcha")) return "recaptcha";
            return "vendor";
          }
        },
      },
    },
  },
});
