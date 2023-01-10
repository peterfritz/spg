import type { AppProps } from 'next/app';

import { MantineProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { JetBrains_Mono as JetBrainsMono } from '@next/font/google';
import { DefaultSeo } from 'next-seo';
import PWAHead from '../components/PWAHead';

import '../styles/globals.css';

const jetBrainsMono = JetBrainsMono({
  subsets: ['latin'],
  display: 'block',
});

const App = ({ Component, pageProps }: AppProps) => {
  const colorScheme = useColorScheme('dark');

  return (
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
          cursorType: 'pointer',
          colorScheme,
          primaryColor: 'teal',
        }}
      >
        <DefaultSeo
          title="Secure Password Generator"
          description="A simple and offline-first secure password generator."
          canonical="https://spg.ptr.red/"
          openGraph={{
            images: [
              {
                url: 'https://spg.ptr.red/api/og',
                width: 1200,
                height: 630,
              },
            ],
          }}
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
};

export default App;
