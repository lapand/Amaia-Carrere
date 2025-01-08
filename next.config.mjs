/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.amaia-carrere.com',
        port: '',
        pathname: '/**',
      },
      // {
      //   protocol: 'http',
      //   hostname: 'localhost',
      //   port: '1337',
      //   pathname: '/**',
      // },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
