export const SITE_URL = "https://docs.speck.finance";

export interface DocRouteSeo {
  path: string;
  title: string;
  description: string;
  changefreq: "weekly" | "monthly";
  priority: number;
}

export const DOC_ROUTES: DocRouteSeo[] = [
  {
    path: "/",
    title: "Welcome to Speck",
    description:
      "Speck Finance is an international investment platform using blockchain to help people in emerging markets protect and grow their wealth.",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    path: "/manifesto",
    title: "Manifesto",
    description:
      "Speck's mission and principles for international investing, financial freedom, and decentralized finance.",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/white-paper",
    title: "Whitepaper",
    description:
      "Speck Finance whitepaper covering emerging markets, investment strategy, and platform technology.",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/regulatory",
    title: "Regulatory Framework",
    description:
      "Speck Finance regulatory framework, Costa Rica licensing, and compliance for crypto and tokenized assets.",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/faq",
    title: "Frequently Asked Questions",
    description:
      "Answers to common questions about Speck Finance, digital assets, yield farming, and DeFi services.",
    changefreq: "monthly",
    priority: 0.7,
  },
];

export const PRERENDER_ROUTES = DOC_ROUTES.map((route) => route.path);

export function getRouteSeo(pathname: string): DocRouteSeo {
    return DOC_ROUTES.find((route) => route.path === pathname) ?? DOC_ROUTES[0];
}

export function pageTitle(title: string): string {
  return `${title} — Speck Finance Documentation`;
}
