module.exports = {
    sassOptions: {
        silenceDeprecations: ['legacy-js-api'],
    },
    images: {
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
    }
}
