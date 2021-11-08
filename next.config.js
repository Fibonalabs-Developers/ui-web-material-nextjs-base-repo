const nextTranslate = require('next-translate')

/**
 * @type {import('next').NextConfig}
 */
let nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
}

if (process.env.NODE_ENV === 'production') {
    module.exports = nextTranslate(nextConfig)
} else {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: process.env.ANALYZE === 'true',
    })
    module.exports = withBundleAnalyzer(nextTranslate(nextConfig))
}
