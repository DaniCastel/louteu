import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Box } from "@chakra-ui/react";
import Router from "next/router";
import NProgress from "nprogress";

import styles from "./layout.module.scss";
import utilStyles from "../styles/utils.module.scss";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Button,
} from "@chakra-ui/react";

let timer: ReturnType<typeof setTimeout>;
let state: string;
let activeRequests = 0;
const delay = 250;

function load() {
  console.log("load");
  if (state === "loading") {
    return;
  }

  state = "loading";

  timer = setTimeout(function () {
    NProgress.start();
  }, delay); // only show progress bar if it takes longer than the delay
}

function stop() {
  console.log("stop");
  if (activeRequests > 0) {
    return;
  }

  state = "stop";

  clearTimeout(timer);
  NProgress.done();
}

Router.events.on("routeChangeStart", load);
Router.events.on("routeChangeComplete", stop);
Router.events.on("routeChangeError", stop);

const name = "[Your Name]";
export const siteTitle = "Louteu, easiest work for teams";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <Box className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
      </Head>
      <header className={styles.header}>
        louteu
        <div>
          <Link href={"/login"}>
            <a>Login</a>
          </Link>
          <Link href={"/register"}>
            <a>Register</a>
          </Link>
          <Button as={Button} mr={2}>
            eje
          </Button>
          <Menu isLazy>
            {/* <MenuButton as={Button}>Profile</MenuButton> */}
            <MenuList id="1">
              <MenuGroup title="Profile">
                <MenuItem>My Account</MenuItem>
                <MenuItem>Payments </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Help">
                <MenuItem>Docs</MenuItem>
                <MenuItem>FAQ</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </div>
      </header>
      <main className={styles.children}>{children}</main>
      <footer>footer</footer>
    </Box>
  );
}
