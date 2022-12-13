import Head from 'next/head';

const PWAHead = () => (
  <Head>
    <meta name="application-name" content="Secure Password Generator" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="spg" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="msapplication-config" content="/icons/browserconfig.xml" />
    <meta name="msapplication-TileColor" content="#099268" />
    <meta name="msapplication-tap-highlight" content="no" />
    <meta name="theme-color" content="#1a1b1e" />

    <link rel="manifest" href="/manifest.json" />

    <link
      rel="apple-touch-icon"
      href="/assets/apple-icon-180.png"
    />

    <link
      href="/assets/apple-splash-dark-2048-2732.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
    />
    <link
      href="/assets/apple-splash-dark-2732-2048.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
    />
    <link
      href="/assets/apple-splash-dark-1668-2388.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
    />
    <link
      href="/assets/apple-splash-dark-2388-1668.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
    />
    <link
      href="/assets/apple-splash-dark-1536-2048.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
    />
    <link
      href="/assets/apple-splash-dark-2048-1536.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
    />
    <link
      href="/assets/apple-splash-dark-1668-2224.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
    />
    <link
      href="/assets/apple-splash-dark-2224-1668.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
    />
    <link
      href="/assets/apple-splash-dark-1620-2160.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
    />
    <link
      href="/assets/apple-splash-dark-2160-1620.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
    />
    <link
      href="/assets/apple-splash-dark-1290-2796.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
    />
    <link
      href="/assets/apple-splash-dark-2796-1290.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
    />
    <link
      href="/assets/apple-splash-dark-1179-2556.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
    />
    <link
      href="/assets/apple-splash-dark-2556-1179.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
    />
    <link
      href="/assets/apple-splash-dark-1284-2778.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
    />
    <link
      href="/assets/apple-splash-dark-2778-1284.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
    />
    <link
      href="/assets/apple-splash-dark-1170-2532.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
    />
    <link
      href="/assets/apple-splash-dark-2532-1170.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
    />
    <link
      href="/assets/apple-splash-dark-1125-2436.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
    />
    <link
      href="/assets/apple-splash-dark-2436-1125.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
    />
    <link
      href="/assets/apple-splash-dark-1242-2688.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
    />
    <link
      href="/assets/apple-splash-dark-2688-1242.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
    />
    <link
      href="/assets/apple-splash-dark-828-1792.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
    />
    <link
      href="/assets/apple-splash-dark-1792-828.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
    />
    <link
      href="/assets/apple-splash-dark-1242-2208.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
    />
    <link
      href="/assets/apple-splash-dark-2208-1242.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
    />
    <link
      href="/assets/apple-splash-dark-750-1334.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
    />
    <link
      href="/assets/apple-splash-dark-1334-750.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
    />
    <link
      href="/assets/apple-splash-dark-640-1136.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
    />
    <link
      href="/assets/apple-splash-dark-1136-640.jpg"
      media="(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
    />
  </Head>
);

export default PWAHead;
