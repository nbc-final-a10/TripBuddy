import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
    dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPWA(nextConfig);
