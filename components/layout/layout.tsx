import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";

import "nprogress/nprogress.css";
import cn from "classnames";

import { Avatar } from "@chakra-ui/react";
import { UserOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";

import NProgress from "nprogress";

import { isAuth, logout } from "helpers/auth";

import styles from "./layout.module.scss";

import Footer from "@/components/footer/footer";

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
      <header
        className={cn({
          [styles.navbar__scrolled]: scrolled,
          [styles.navbar__active]: mobileActive,
          [styles.navbar]: true,
        })}
      >
        <div
          className={styles.navbar__mobile_menu}
          onClick={() => setMobileActive(!mobileActive)}
        >
          {mobileActive ? (
            <CloseOutlined className="menu-icon" />
          ) : (
            <MenuOutlined className="menu-icon" />
          )}
        </div>

        <ul
          className={cn({
            [styles.navbar__options_active]: mobileActive,
            [styles.navbar__options]: true,
          })}
        >
          <li>
            <Link href={"/user/link/create"}>
              <a>Submit a link</a>
            </Link>
          </li>
          {isAuth() && isAuth().role === "admin" && (
            <li>
              <Link href={"/admin"}>
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

        <div className={styles.navbar__logo}>
          <Link href={"/"}>
            <a>
              <strong>Louteu</strong>
            </a>
          </Link>
        </div>
        <div>
          {isAuth() && isAuth().role === "subscriber" && (
            <div className={styles.navbar__avatar}>
              <Avatar icon={<UserOutlined />} />
              <Link href={"/user"}>
                <a>{isAuth().name}</a>
              </Link>
            </div>
          )}
        </div>
      </header>
      <main className={styles.children}>{children}</main>
      <Footer></Footer>
    </div>
  );
}
