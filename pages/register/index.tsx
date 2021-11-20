import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Form, Input, Checkbox, Button, Typography } from "antd";
import axios from "axios";
import { openNotification } from "utils/toast";

import { API } from "config";
import { isAuth } from "helpers/auth";

import styles from "./register.module.scss";

const { Title } = Typography;

type IUser = {
  name: string;
  agreement: boolean;
  confirm: string;
  email: string;
  username: string;
  password: string;
};

export default function Register() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [buttonText, setButtonText] = useState("Register");

  const onFinish = async (values: IUser) => {
    setButtonText("Registering");

    try {
      const { data } = await axios.post<{
        message: string;
      }>(`${API}/register`, {
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
      });
      openNotification("info", data.message);
      setButtonText("Submitted");
    } catch (error: any) {
      openNotification("warning", error.response.data.error);
      setButtonText("Register");
    }
  };
  useEffect(() => {
    isAuth() && router.push("/");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <Title>Register</Title>
        <Form
          form={form}
          name="register"
          layout="vertical"
          className={styles.form}
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your username!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
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
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={buttonText === "Registering"}
              className={styles.button}
            >
              {buttonText}
            </Button>
          </Form.Item>
        </Form>
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
