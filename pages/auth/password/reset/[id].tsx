import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Form, Input, Checkbox, Button, Typography } from "antd";
import axios from "axios";
import jwt from "jsonwebtoken";
import { openNotification } from "utils/toast";

import { API } from "config";

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

type IReset = {
  newPassword: string;
};

export default function Register() {
  const router = useRouter();
  const [state, setState] = useState({
    name: "",
    buttonText: "Reset Password",
  });
  const [form] = Form.useForm();

  const { name, buttonText } = state;

  const onFinish = async (values: IReset) => {
    try {
      const { data } = await axios.post<{
        message: string;
      }>(`${API}/reset-password`, {
        resetPasswordLink: router.query.id,
        newPassword: values.newPassword,
        email: values.email,
        password: values.password,
      });
      openNotification("info", data.message);
      setState({ ...state, buttonText: "Submitted" });
    } catch (error: any) {
      openNotification("warning", error.response.data.error);
      setState({ ...state, buttonText: "Reset Password" });
    }
  };
  useEffect(() => {
    const decoded = jwt.decode(router.query.id);
    if (decoded) {
      setState({ ...state, name: decoded.name });
    }
  }, [router]);

  return (
    <div>
      <Title>Hi {name} Reset password</Title>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="newPassword"
          label="New password"
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
          name="confirmNewPassword"
          label="Confirm new password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your new password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
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
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={buttonText === "Reseting"}
          >
            {buttonText}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
