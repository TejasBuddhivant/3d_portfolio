import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Workspace packages ship TypeScript source and are compiled by Next.js.
  transpilePackages: [
    "@portfolio/api",
    "@portfolio/config",
    "@portfolio/hooks",
    "@portfolio/store",
    "@portfolio/ui",
  ],
  // Prevent Turbopack from trying to bundle Spline's DRACO/WASM assets.
  serverExternalPackages: [
    "@splinetool/runtime",
    "@splinetool/react-spline",
  ],
  async rewrites() {
    return [
      {
        // Fix Spline Web Component WASM loading bug
        source: "/process.wasm",
        destination: "https://cdn.spline.design/@splinetool/viewer@2.0.2/build/process.wasm",
      },
      {
        // Fix ZenQuotes CORS issue by proxying through Next.js
        source: "/zenquotes-proxy/:path*",
        destination: "https://zenquotes.io/api/:path*",
      }
    ];
  },
};

export default nextConfig;
