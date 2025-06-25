import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/HoldSwapDrop' : '',
  assetPrefix: isProd ? '/HoldSwapDrop/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
