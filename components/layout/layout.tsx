import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";

import "nprogress/nprogress.css";
import cn from "classnames";

import { Avatar } from "@chakra-ui/react";
import { UserOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";

import NProgress from "nprogress";

import styles from "./layout.module.scss";

import Footer from "@/components/footer/footer";
import Navbar from "./navbar";

let timer: ReturnType<typeof setTimeout>;
let state: string;
const activeRequests = 0;
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

export const siteTitle = "Louteu, easiest work for teams";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  //navbar scroll when active state
  const [scrolled, setScrolled] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 66) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    changeBackground();
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground);
  });

  return (
    <div className={styles.container}>
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
      </Head>
      <Navbar></Navbar>
      <main className={styles.children}>{children}</main>
      <Footer></Footer>
    </div>
  );
}
