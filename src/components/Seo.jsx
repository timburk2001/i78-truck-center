import { Helmet } from 'react-helmet-async'
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '../lib/site'

// Per-page <head> tags. Drop one near the top of each page's JSX.
// `path` is the route path (e.g. '/services') used for the canonical + og:url.
export default function Seo({ title, description, path = '', image = DEFAULT_OG_IMAGE }) {
  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
