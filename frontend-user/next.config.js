const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  // Configure i18n for public routes only
  i18n: {
    locales: ['en', 'sv'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  // Exclude internal routes from locale prefixing
  async rewrites() {
    return {
      beforeFiles: [
        // Rewrite public routes to include locale prefix
        {
          source: '/pricing',
          destination: '/en/pricing',
          locale: false,
        },
        {
          source: '/login',
          destination: '/en/login',
          locale: false,
        },
        {
          source: '/register',
          destination: '/en/register',
          locale: false,
        },
        {
          source: '/',
          destination: '/en',
          locale: false,
        },
        // Rewrite internal routes to remove locale prefix
        {
          source: '/:locale(en|sv)/dashboard/:path*',
          destination: '/dashboard/:path*',
          locale: false,
        },
        {
          source: '/:locale(en|sv)/scripts/:path*',
          destination: '/scripts/:path*',
          locale: false,
        },
        {
          source: '/:locale(en|sv)/executions/:path*',
          destination: '/executions/:path*',
          locale: false,
        },
        {
          source: '/:locale(en|sv)/profile/:path*',
          destination: '/profile/:path*',
          locale: false,
        },
      ],
    };
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig); 