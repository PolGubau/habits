/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
};

module.exports = nextConfig;

module.exports = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    domains: ["api.multiavatar.com"],
    formats: ["image/webp"],
  },
};
