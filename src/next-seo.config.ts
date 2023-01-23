import type { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  defaultTitle: 'Freely',
  titleTemplate: '%s | Freely',
  description:
    "Welcome to Freely, the ultimate destination for movie and series enthusiasts! Here, you can find detailed information about your favorite films and TV shows, including plot summaries, cast lists, and trailer links. You can also watch trailers and learn more about your favorite actors. So whether you're a casual viewer or a die-hard fan, our website has something for everyone. Come visit us and discover the magic of movies and series!",
  canonical: 'https://freely.vercel.app/',
  robotsProps: {
    noarchive: true,
    maxSnippet: -1,
    maxImagePreview: 'standard',
    maxVideoPreview: -1,
  },
  openGraph: {
    type: 'website',
    locale: 'en-US',
    url: 'https://freelym.vercel.app/',
    siteName: 'Freely',
    images: [
      {
        url: 'https://freelym.vercel.app/open-graph.jpg',
        secureUrl: 'https://freelym.vercel.app/open-graph.jpg',
        type: 'image/jpeg',
        width: 1200,
        height: 630,
        alt: 'Freely',
      },
    ],
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      property: 'keywords',
      content:
        'movies app, movies details, movie details, popular movies, upcoming movies, reviews, trailers, movies trailers, movies reviews, search movies, series, tv shows, tv series, tv shows details, tv series details, tv shows trailers, tv series trailers, tv shows reviews, tv series reviews, search tv shows, search tv series, cast lists, trailer links, watch trailers, learn more about your favorite actors, casual viewer, die-hard fan, magic of movies and series',
    },
    {
      name: 'author',
      content: 'https://github.com/dreamqip',
    },
    {
      name: 'theme-color',
      content: '#6200EE',
    },
    {
      name: 'viewport',
      content:
        'minimum-scale=1, initial-scale=1, width=device-width, height=device-height, shrink-to-fit=no, viewport-fit=cover, maximum-scale=5',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'Freely',
    },
    {
      name: 'mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'application-name',
      content: 'Freely',
    },
    {
      name: 'google-site-verification',
      content: 'GyBTjGV8x2Y91TCOchednsyamPwdOlqVb-F7YZ9okLI',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.png',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
    {
      rel: 'apple-touch-icon',
      href: '/icons/apple-icon-180.png',
    },
  ],
};

export default config;
