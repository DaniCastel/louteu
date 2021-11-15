import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import axios, { AxiosResponse, AxiosError } from "axios";

import { openNotification } from "@/utils/toast";
import { API } from "@/config/index";
import { authenticate, isAuth } from "@/helpers/auth";

import styles from "./login.module.scss";

type IUser = {
  name: string;
  agreement: boolean;
  confirm: string;
  email: string;
  username: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const [buttonText, setButtonText] = useState("Login");

  const onFinish = async (values: IUser) => {
    setButtonText("Logging in");

    try {
      const response = await axios.post<{
        message: string;
      }>(`${API}/login`, {
        email: values.email,
        password: values.password,
      });
      authenticate(response, () => {
        isAuth().role === "admin"
          ? router.push("/admin")
          : router.push("/user");
        openNotification("success", response.data.message);
      });
    } catch (error: any) {
      if (error.response) {
        openNotification("warning", error.response.data.error);
      } else {
        console.log(error);
        openNotification("error", "Server error");
      }
      setButtonText("Login");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    isAuth() && router.push("/");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.login_panel}>
        <h1>Login</h1>
        <Link href="/auth/password/forgot">
          <a>Forgot password</a>
        </Link>
      </div>
      <div className={styles.ocean}>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
      </div>
      <div className={styles.ocean}>
        <div className={styles.purple_wave}></div>
        <div className={styles.purple_wave}></div>
      </div>
    </div>
  );
}
