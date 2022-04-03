import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Heading,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import axios from "axios";
import { openToast } from "utils/toast";

import { API } from "config";
import { isAuth } from "helpers/auth";

import styles from "./register.module.scss";

type IUser = {
  name: string;
  agreement: boolean;
  confirm: string;
  email: string;
  username: string;
  password: string;
};

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
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
      openToast("info", data.message);
      setButtonText("Submitted");
    } catch (error: any) {
      openToast("warning", error.response.data.error);
      setButtonText("Register");
    }
  };
  useEffect(() => {
    isAuth() && router.push("/");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <Heading>Register</Heading>
        <form
          name="register"
          layout="vertical"
          className={styles.form}
          onSubmit={onFinish}
        >
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">First name</FormLabel>
            <Input
              id="name"
              placeholder="name"
              {...register("name", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>"error name"</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              placeholder="username"
              {...register("username", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>"error name"</FormErrorMessage>
          </FormControl>
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
            <FormErrorMessage>"error name"</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="password">password</FormLabel>
            <Input
              id="password"
              placeholder="password"
              {...register("password", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>"error name"</FormErrorMessage>
          </FormControl>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
            className={styles.button}
          >
            {buttonText}
          </Button>
        </form>
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
