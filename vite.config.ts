import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { DOC_ROUTES, PRERENDER_ROUTES } from "./src/seo/config";
import { routeHtmlPlugin } from "./plugins/route-html";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const changefreq = Object.fromEntries(
  DOC_ROUTES.map((route) => [route.path, route.changefreq]),
);
const priority = Object.fromEntries(
  DOC_ROUTES.map((route) => [route.path, route.priority]),
);

const normalizeBase = (value: string | undefined): string => {
  const base = value?.trim() || "/";
  return base.endsWith("/") ? base : `${base}/`;
};

export default defineConfig({
  base: normalizeBase(process.env.VITE_BASE_PATH),
  plugins: [
    react(),
    Sitemap({
      hostname: "https://docs.speck.finance",
      dynamicRoutes: PRERENDER_ROUTES.filter((route) => route !== "/"),
      generateRobotsTxt: false,
      changefreq,
      priority,
    }),
    routeHtmlPlugin(),
  ],
  server: {
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.svg", "**/*.jpg", "**/*.jpeg"],
});
