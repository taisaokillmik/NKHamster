import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://hamsternhaminh.vn'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/account'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
