module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    APP_NAME: process.env.APP_NAME,
    API: process.env.API,
    IS_PROD: process.env.IS_PROD,
    DOMAIN: process.env.DOMAIN,
    FB_APP_ID: process.env.FB_APP_ID,
  },
  images: {
    domains: ["louteu.s3.amazonaws.com", "via.placeholder.com"],
  },
};
