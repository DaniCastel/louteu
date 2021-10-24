import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";

import { Form, Input, Checkbox, Button, Typography } from "antd";
import axios, { AxiosResponse, AxiosError } from "axios";

import { openNotification } from "utils/toast";
import { API } from "config";
import { authenticate, isAuth } from "helpers/auth";

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
    <div>
      <Title>Login</Title>
      {JSON.stringify(isAuth())}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
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
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
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
    </div>
  );
}
