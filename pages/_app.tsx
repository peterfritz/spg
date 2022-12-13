import type { AppProps } from 'next/app';
import '../styles/globals.css';

import { MantineProvider } from '@mantine/core';
import { JetBrains_Mono as JetBrainsMono } from '@next/font/google';
import { DefaultSeo } from 'next-seo';
import PWAHead from '../components/PWAHead';

const jetBrainsMono = JetBrainsMono({ subsets: ['latin'] });

const App = ({ Component, pageProps }: AppProps) => (
  <div
    style={{
      height: '100%',
      width: '100%',
      ...jetBrainsMono.style,
    }}
  >
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: jetBrainsMono.style.fontFamily,
        fontFamilyMonospace: jetBrainsMono.style.fontFamily,
        colorScheme: 'dark',
        primaryColor: 'teal',
      }}
    >
      <DefaultSeo
        title="spg - Secure Password Generator"
        description="A simple and offline-first secure password generator."
        canonical="https://spg.ptr.red/"
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/assets/favicon.svg',
          },
        ]}
      />
      <PWAHead />
      <Component {...pageProps} />
    </MantineProvider>
  </div>
);

export default App;
