import "../styles/globals.scss";
import type { AppProps } from "next/app";

import Layout from "components/layout/layout";

import "antd/dist/antd.css";
require("../styles/variables.less");

// Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
