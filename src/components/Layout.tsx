import type { FC, PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/Header';
import Main from '@/components/Main';
import Footer from '@/components/Footer';

interface MainLayoutProps {
  theme?: string;
  font?: string;
}

const Layout: FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
  theme,
  font,
}) => {
  return (
    <ThemeProvider
      enableSystem={true}
      attribute='class'
      forcedTheme={theme || undefined}
    >
      <div
        className={`${font} mx-auto flex min-h-full max-w-7xl flex-auto flex-col bg-inherit px-2 font-montserrat font-montserrat md:px-4`}
      >
        <Header />
        <Main>{children}</Main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
