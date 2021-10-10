import { ChakraProvider, withDefaultColorScheme } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

import "../styles/globals.scss";
import type { AppProps } from "next/app";

import Layout from "components/layout/layout";

// Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const theme = extendTheme(
  {
    colors,
    initialColorMode: "light",
  },
  withDefaultColorScheme({ colorScheme: "purple" })
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
export default MyApp;
