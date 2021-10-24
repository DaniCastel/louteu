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

export default function Forgot() {
  const router = useRouter();
  const [buttonText, setButtonText] = useState("Send email");

  const onFinish = async (values: IUser) => {
    setButtonText("Sending email");

    try {
      const response = await axios.post<{
        message: string;
      }>(`${API}/forgot-password`, {
        email: values.email,
      });
      openNotification("success", response.data.message);
      setButtonText("Done");
    } catch (error: any) {
      openNotification("warning", error.response.data.error);
      setButtonText("Send email");
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
      <Title>Forgot password</Title>
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
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            disabled={buttonText === "Sending email"}
          >
            {buttonText}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
