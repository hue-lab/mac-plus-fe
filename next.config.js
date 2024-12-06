module.exports = {
    sassOptions: {
        silenceDeprecations: ['legacy-js-api'],
    },
    images: {
        minimumCacheTTL: 31536000,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.macplus.by',
                port: '',
            },
        ],
    },
    distDir: 'build',
    trailingSlash: true,
    env: {
        API_HOST: 'https://api.macplus.by',
    },
    redirects: async () => {
        return [
            {
                source: '/:path*',
                has: [{ type: 'header', key: 'host', value: 'www.macplus.by' }],
                destination: 'https://macplus.by/:path*',
                permanent: true,
            },
        ];
    },
}
