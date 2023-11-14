/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler : {
        styledComponents: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname:  '**'
            }, 
            {
                protocol: 'https',
                hostname: 'modu-study-note.s3.ap-northeast-2.amazonaws.com',
                pathname:  '**'
            }
        ]
    },
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
          });
          return config;
    }
}

module.exports = nextConfig
