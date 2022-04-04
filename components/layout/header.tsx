import { useEffect, useState } from "react";

import Router from "next/router";

import "nprogress/nprogress.css";

import NProgress from "nprogress";
import styles from "./layout.module.scss";
import { isAuth, logout } from "@/helpers/auth";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Button,
  Grid,
  Box,
  Avatar,
} from "@chakra-ui/react";
import Link from "next/link";

export const siteTitle = "Louteu, easiest work for teams";

export default function Header() {
  return (
    <Grid
      templateColumns="min-content 1fr"
      gap={6}
      padding={4}
      alignItems="center"
    >
      <div className={styles.navbar__logo}>
        <Link href={"/"}>
          <a>
            <strong>Louteu</strong>
          </a>
        </Link>
      </div>
      <Box display="flex" justifyContent="end" gap={4}>
        {!isAuth() && (
          <>
            <Link key="login" href={"/login"}>
              <a>
                <Button variant="outline">Iniciar sesión</Button>
              </a>
            </Link>

            <Link key="register" href={"/register"}>
              <a>
                <Button variant="outline">Registrarme</Button>
              </a>
            </Link>
          </>
        )}
        <Menu>
          <Link href={"/user/link/create"}>
            <a>
              <Button>Submit a link</Button>
            </a>
          </Link>
          {isAuth() && isAuth().role === "subscriber" && (
            <div>
              <MenuButton as={Button}>Profile</MenuButton>
              <Link href={"/user"}>
                <a>{isAuth().name}</a>
              </Link>
            </div>
          )}

          <MenuList>
            <MenuGroup title="Profile">
              {isAuth() && isAuth().role === "admin" && (
                <MenuItem>
                  <Link href={"/admin"}>
                    <a>Panel de admin{isAuth().name}</a>
                  </Link>
                </MenuItem>
              )}
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Help">
              {isAuth() && (
                <MenuItem>
                  <a key="logout" onClick={logout}>
                    Logout
                  </a>
                </MenuItem>
              )}
            </MenuGroup>
          </MenuList>
        </Menu>
      </Box>
    </Grid>
  );
}
