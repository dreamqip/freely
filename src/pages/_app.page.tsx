import '@/styles/globals.css';

import type { AppProps } from '@/types/app';
import { createStore } from '@/store';
import { DefaultSeo } from 'next-seo';
import { Provider } from 'react-redux';
import { Montserrat } from 'next/font/google';
import ProgressBar from '@badrap/bar-of-progress';
import SEO from '@/next-seo.config';
import Layout from '@/components/Layout';
import Router from 'next/router';

const progress = new ProgressBar({
  size: 4,
  className: 'progress-bar',
  delay: 100,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

const store = createStore();

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Provider store={store}>
        <Layout font={montserrat.variable} theme={Component.theme}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default App;
