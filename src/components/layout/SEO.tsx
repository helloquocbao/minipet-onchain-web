import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  isDark: boolean;
}

export const SEO = ({ isDark }: SEOProps) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const baseUrl = "https://minipet.vercel.app";

  const schemaOrgJSONLD = {
    "@context": "http://schema.org",
    "@type": "SoftwareApplication",
    "name": "MiniPet",
    "operatingSystem": "Windows, macOS",
    "applicationCategory": "ProductivityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": t('seo.description'),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "ratingCount": "150"
    }
  };

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{t('seo.title')}</title>
      <meta name="description" content={t('seo.description')} />
      <meta name="keywords" content={t('seo.keywords')} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={`${baseUrl}${location.pathname}`} />

      {/* Performance: Preconnect to Font Servers */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800;900&display=swap" rel="stylesheet" media="all" />

      {/* Multilingual SEO (Hreflang) */}
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/?lang=en`} />
      <link rel="alternate" hrefLang="vi" href={`${baseUrl}/?lang=vi`} />
      <link rel="alternate" hrefLang="zh" href={`${baseUrl}/?lang=zh`} />
      <link rel="alternate" hrefLang="fr" href={`${baseUrl}/?lang=fr`} />
      <link rel="alternate" hrefLang="it" href={`${baseUrl}/?lang=it`} />
      <link rel="alternate" hrefLang="x-default" href={baseUrl} />

      {/* Mobile Experience */}
      <meta name="theme-color" content={isDark ? '#0f172a' : '#e8eeff'} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Performance: Preload Critical Assets */}
      <link rel="preload" href="/cat/spritesheet.png" as="image" />
      <link rel="preload" href="/icons/icon.png" as="image" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={baseUrl} />
      <meta property="og:title" content={t('seo.title')} />
      <meta property="og:description" content={t('seo.description')} />
      <meta property="og:image" content={`${baseUrl}/icons/icon.png`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={baseUrl} />
      <meta name="twitter:title" content={t('seo.title')} />
      <meta name="twitter:description" content={t('seo.description')} />
      <meta name="twitter:image" content={`${baseUrl}/icons/icon.png`} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* Global Performance Styles */}
      <style>{`
        section {
          content-visibility: auto;
          contain-intrinsic-size: 1px 500px;
        }
        section#hero {
          content-visibility: visible;
        }
        .hero-orb {
          will-change: transform, opacity;
        }
        img {
          content-visibility: auto;
          aspect-ratio: attr(width) / attr(height);
          height: auto; /* Fallback for layout */
        }
        .cat-sprite-frame {
          will-change: background-position;
        }
      `}</style>
    </Helmet>
  );
};
