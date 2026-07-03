import type { Plugin } from "vite";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { DOC_ROUTES, pageTitle, SITE_URL } from "../src/seo/config";

function buildStructuredData(title: string, description: string, url: string): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url,
    publisher: {
      "@type": "Organization",
      name: "Speck Finance",
      url: "https://speck.finance",
    },
  });
}

function injectRouteMeta(html: string, route: (typeof DOC_ROUTES)[number]): string {
  const canonicalUrl = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
  const title = pageTitle(route.title);
  const structuredData = buildStructuredData(route.title, route.description, canonicalUrl);

  const headInjection = `
    <title>${title}</title>
    <meta name="description" content="${route.description}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta name="robots" content="index, follow" />
    <script type="application/ld+json">${structuredData}</script>`;

  return html
    .replace(/<title>.*?<\/title>/, "")
    .replace(
      /<meta name="description" content=".*?" \/>/,
      "",
    )
    .replace(
      /<link rel="canonical" href=".*?" \/>/,
      "",
    )
    .replace(
      /<meta name="robots" content=".*?" \/>/,
      "",
    )
    .replace("</head>", `${headInjection}\n  </head>`);
}

export function routeHtmlPlugin(): Plugin {
  return {
    name: "route-html",
    apply: "build",
    closeBundle() {
      const distDir = join(process.cwd(), "dist");
      const indexPath = join(distDir, "index.html");
      const baseHtml = readFileSync(indexPath, "utf-8");

      for (const route of DOC_ROUTES) {
        const html = injectRouteMeta(baseHtml, route);

        if (route.path === "/") {
          writeFileSync(indexPath, html, "utf-8");
          continue;
        }

        const routeDir = join(distDir, route.path.slice(1));
        mkdirSync(routeDir, { recursive: true });
        writeFileSync(join(routeDir, "index.html"), html, "utf-8");
      }
    },
  };
}
