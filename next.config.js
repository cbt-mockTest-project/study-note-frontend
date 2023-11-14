/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler : {
        styledComponents: true,
    },
    images: {
        domains: ['lh3.googleusercontent.com','modu-study-note.s3.ap-northeast-2.amazonaws.com'],
    },
}

module.exports = nextConfig
