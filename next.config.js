/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //to make sure user picture shows up
  images: {
    domains: ["lh3.googleusercontent.com", "s.gravatar.com"],
  },
  future: {
    webpack5: true,
  },
  webpack: (config, {}) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
  },
};

module.exports = nextConfig;
