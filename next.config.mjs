/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.lingofoundry.com',
                pathname: '/api/file/download/**',
            },
            {
                protocol: 'https',
                hostname: 'lingofoundry.sgp1.cdn.digitaloceanspaces.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'lingofoundrydev.sgp1.cdn.digitaloceanspaces.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'lingofoundry.sgp1.digitaloceanspaces.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'lingofoundrydev.sgp1.digitaloceanspaces.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
