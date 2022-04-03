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
  i18n: {
    /**
     * Provide the locales you want to support in your application
     */
    locales: ["en", "es"],
    /**
     * This is the default locale you want to be used when visiting
     * a non-locale prefixed path.
     */
    defaultLocale: "en",
  },
};
