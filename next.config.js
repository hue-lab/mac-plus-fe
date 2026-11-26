const apiHost = new URL(process.env.API_HOST || 'https://api.macplus.by');

module.exports = {
    sassOptions: {
        silenceDeprecations: ['legacy-js-api'],
    },
    images: {
        minimumCacheTTL: 31536000,
        remotePatterns: [
            {
                protocol: apiHost.protocol.slice(0, -1),
                hostname: apiHost.hostname,
                port: apiHost.port,
            },
        ],
    },
    distDir: 'build',
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
    env: {
        API_HOST: apiHost.origin,
        TURNSTILE_SITE_KEY: '0x4AAAAAADygPJz9Vg2Cf5kV',
    },
    rewrites: async () => [
        { source: '/sitemap.xml', destination: '/api/sitemap' },
    ],
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
