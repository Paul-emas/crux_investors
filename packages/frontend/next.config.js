const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

// TODO: Enable next-pwa when it will work with Webpack 5
module.exports = withPWA({
  async rewrites() {
    return [{ source: "/v/play/:path*", destination: "/api/play/:path*" },
    { source: "/video/play/:path*", destination: "/api/play/:path*" }];
  },
  // module.exports = {
  future: {
    webpack5: true,
  },
  // eslint-disable-next-line no-unused-vars
  webpack: function (config, options) {
    config.experiments = {}
    return config
  },
  images: {
    domains: ['placeimg.com', 'images.ctfassets.net', 's.gravatar.com'],
  },
  pwa: {
    disable: true,
    dest: 'public',
    runtimeCaching,
  },
})
