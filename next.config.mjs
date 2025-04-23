/** @type {import('next').NextConfig} */

const isDevelopment = process.env.NODE_ENV === 'development';

const nextConfig = {
  // reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.amaia-carrere.com',
        port: '',
        pathname: '/**',
      },
      ...(isDevelopment
        ? [
            {
              protocol: 'http',
              hostname: 'localhost',
              port: '1337',
              pathname: '/**',
            },
          ]
        : []),
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
