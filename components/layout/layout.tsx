import { useEffect, useState } from "react";
import Head from "next/head";
import { isAuth, logout } from "helpers/auth";
import Link from "next/link";
import Router from "next/router";

import { Menu, Button } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

import styles from "./layout.module.scss";
import utilStyles from "../styles/utils.module.scss";

const { SubMenu } = Menu;

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
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
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
      <header className={styles.header}>
        <ul>
          {isAuth() && isAuth().role === "admin" && (
            <li>
              <Link href={"/admin"}>
                <a>{isAuth().name}</a>
              </Link>
            </li>
          )}
          {isAuth() && isAuth().role === "subscriber" && (
            <li>
              <Link href={"/user"}>
                <a>{isAuth().name}</a>
              </Link>
            </li>
          )}
          {!isAuth() && (
            <>
              <li>
                <Link key="login" href={"/login"}>
                  <a>login</a>
                </Link>
              </li>
              <li>
                <Link key="register" href={"/register"}>
                  <a>Register</a>
                </Link>
              </li>
            </>
          )}
          {isAuth() && (
            <li>
              <a key="logout" onClick={logout}>
                Logout
              </a>
            </li>
          )}
        </ul>
      </header>
      <main className={styles.children}>{children}</main>
      <footer>footer</footer>
    </div>
  );
}
