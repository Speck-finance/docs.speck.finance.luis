import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getRouteSeo, pageTitle, SITE_URL } from "../seo/config";

export const SeoHead: FC = () => {
  const { pathname } = useLocation();
  const seo = getRouteSeo(pathname);
  const canonicalUrl = `${SITE_URL}${seo.path === "/" ? "/" : seo.path}`;
  const title = pageTitle(seo.title);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: seo.title,
    description: seo.description,
    url: canonicalUrl,
    publisher: {
      "@type": "Organization",
      name: "Speck Finance",
      url: "https://speck.finance",
    },
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};
