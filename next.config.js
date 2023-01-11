// @ts-check

const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  runtimeCaching,
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const plugins = [withPWA, withBundleAnalyzer];

const removeConsoleConfig = {
  exclude: ['error', 'warn'],
};

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  images: {
    dangerouslyAllowSVG: true,
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production' ? removeConsoleConfig : false,
  },
};

module.exports = plugins.reduce((config, plugin) => plugin(config), nextConfig);
