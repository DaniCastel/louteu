import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Form, Input, Checkbox, Button, Typography } from "antd";
import axios from "axios";
import { openNotification } from "utils/toast";

import { API } from "config";
import { isAuth } from "helpers/auth";

const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

type IUser = {
  name: string;
  agreement: boolean;
  confirm: string;
  email: string;
  username: string;
  password: string;
};

export default function Register() {
  const router = useRouter();
  const [buttonText, setButtonText] = useState("Register");
  const [form] = Form.useForm();

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
    <div>
      <Title>Register</Title>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
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
                  new Error("The two passwords that you entered do not match!")
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
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={buttonText === "Registering"}
          >
            {buttonText}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
