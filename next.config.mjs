import withPWAInit from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pedixhwyfardtsanotrp.supabase.co',
            },
            {
                protocol: 'http',
                hostname: 'k.kakaocdn.net',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'i.namu.wiki',
            },
        ],
    },
};

const withPWA = withPWAInit({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    mode: 'production',
    buildExcludes: [/middleware-manifest\.json$/],
    swSrc: 'public/sw.js',
});

export default withPWA(nextConfig);
