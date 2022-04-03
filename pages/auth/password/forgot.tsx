import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";

import axios, { AxiosResponse, AxiosError } from "axios";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Heading,
} from "@chakra-ui/react";
import { openToast } from "utils/toast";
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
      openToast("success", response.data.message);
      setButtonText("Done");
    } catch (error: any) {
      openToast("warning", error.response.data.error);
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
      <form
        name="register"
        layout="vertical"
        className={styles.form}
        onSubmit={onFinish}
      >
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            placeholder="email"
            {...register("email", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>error name</FormErrorMessage>
        </FormControl>

        <Button
          mt={4}
          colorScheme="teal"
          isLoading={buttonText === "Sending email"}
          type="submit"
          className={styles.button}
        >
          {buttonText}
        </Button>
      </form>
    </div>
  );
}
