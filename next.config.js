const nextRuntimeDotenv = require('next-runtime-dotenv')

const withConfig = nextRuntimeDotenv({
  // path: '.env',
  public: [
    'BASE_URL'
  ],
  server: []
})

module.exports = withConfig({
  reactStrictMode: true,
  swcMinify: true,
})
