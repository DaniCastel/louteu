import "../styles/globals.scss";
import type { AppProps } from "next/app";

import Layout from "components/layout/layout";

import "antd/dist/antd.css";
require("../styles/antd_variables.less");


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
