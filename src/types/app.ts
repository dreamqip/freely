import type { NextPage } from 'next';
import type { AppProps as NextAppProps } from 'next/app';

export type NextPageWithTheme<P = object, IP = P> = NextPage<P, IP> & {
  theme?: string;
};

type EnhancedAppProps<P> = {
  Component: NextAppProps<P>['Component'] & { theme?: string };
  pageProps: NextAppProps<P>['pageProps'];
} & P;

export type AppProps = EnhancedAppProps<NextAppProps>;
