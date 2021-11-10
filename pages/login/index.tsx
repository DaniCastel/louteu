import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Form, Input, Carousel, Button, Typography } from "antd";
import axios, { AxiosResponse, AxiosError } from "axios";

import { openNotification } from "utils/toast";
import { API } from "config";
import { authenticate, isAuth } from "helpers/auth";

import styles from "./login.module.scss";

const { Title } = Typography;

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
      openNotification("warning", error.response.data.error);
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
      <div className={styles.card}>
        <div className={styles.loginForm}>
          <Title>Login</Title>
          <Form
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 8,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                {buttonText}
              </Button>
            </Form.Item>
          </Form>
          <Link href="/auth/password/forgot">
            <a>Forgot password</a>
          </Link>
        </div>
        <div className={styles.info}>
          info
        </div>
      </div>
      <div className={styles.ocean}>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
      </div>

      {/* {JSON.stringify(isAuth())} */}
    </div>
  );
}
