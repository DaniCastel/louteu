import cookie from "js-cookie";
import Router from "next/router";

// set in cookie constructor
export const setCookie = (key, value) => {
  // if we are in client side mode
  if (process.browser) {
    // if window
    cookie.set(key, value, {
      expires: 1, // 1 day
    });
  }
};

//remove from cookie
export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key);
  }
};

// get cookie
export const getCookieFromBrowser = (key) => {
  return cookie.get(key);
};

// get cookie
export const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  console.log("req.headers.cookie", req.headers.cookie);
  let token = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith(`${key}=`));

  if (!token) {
    return undefined;
  }

  let tokenValue = token.split("=")[1];
  console.log("getCookieFromServer", tokenValue);
  return tokenValue;
};

// get cookie
export const getCookie = (key, req) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

// set in localstorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

//remove from localStorage
export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

// authenticate by passing data to cookie and local storage during sign interface

export const authenticate = (response, next) => {
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};

//access user info from localstorage

export const isAuth = () => {
  if (process.browser) {
    const cookieExists = getCookie("token");

    if (cookieExists) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

export const logout = () => {
  removeCookie("token");
  removeLocalStorage("user");
  Router.push("/login");
};
