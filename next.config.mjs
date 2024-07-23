const PHASE_DEVELOPMENT_SERVER = process.env.NODE_ENV === 'development';
const PHASE_PRODUCTION_BUILD = process.env.NODE_ENV === 'production';

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

const nextConfigFunction = async phase => {
    if (
        phase === PHASE_DEVELOPMENT_SERVER ||
        phase === PHASE_PRODUCTION_BUILD
    ) {
        const withPWA = (await import('next-pwa')).default({
            dest: 'public',
            register: true,
            scope: '/',
            sw: '/sw.js',
            // buildExcludes: [/middleware-manifest\.json$/],
            swSrc: '/sw.js',
        });
        return withPWA(nextConfig);
    }
    return nextConfig;
};

// const withPWA = withPWAInit({
//   dest: "public",
//   disable: process.env.NODE_ENV === 'development',
//   mode: 'production',
//   buildExcludes: [/middleware-manifest\.json$/],
//   swSrc: 'public/sw.js',
// });

export default nextConfigFunction;
