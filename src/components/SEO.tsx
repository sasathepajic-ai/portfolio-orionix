import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
}

export function SEO({ 
  title = 'Pragmatic Labs AI - Intelligent Business Solutions', 
  description = 'Pragmatic Labs AI helps businesses leverage the power of Artificial Intelligence to automate workflows, analyze data, and drive growth.',
  canonical
}: SEOProps) {
  const siteUrl = 'https://pragmaticlabs.ai'; // Replace with actual domain
  const fullUrl = canonical ? canonical : siteUrl;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}/og-image.jpg`} />
    </Helmet>
  );
}
