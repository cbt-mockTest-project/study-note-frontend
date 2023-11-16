/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
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
            },
            {
                protocol: 'http',
                hostname: 'k.kakaocdn.net',
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
