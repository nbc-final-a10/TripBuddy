import withPWAInit from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
};

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === 'development',
  mode: 'production',
  buildExcludes: [/middleware-manifest\.json$/],
  swSrc: 'public/sw.js',
});

export default withPWA(nextConfig);