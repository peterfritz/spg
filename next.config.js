const withPWA = require('next-pwa')({
  dest: 'public',
  dynamicStartUrl: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withPWA(nextConfig);
