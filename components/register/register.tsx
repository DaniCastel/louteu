import { useEffect } from "react";
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

import { API } from "@/config/index";
import { isAuth } from "@/helpers/auth";

import styles from "./register.module.scss";

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (values) => {
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
    } catch (error: any) {
      console.log(error);
      openToast("warning", error.response.data.error);
    }
  };
  useEffect(() => {
    isAuth() && router.push("/");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <Heading>Registro</Heading>
        <form
          name="register"
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              placeholder="name"
              {...register("name", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>Ingresa tu nombre</FormErrorMessage>
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
            <FormErrorMessage>Ingresa un username</FormErrorMessage>
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
            <FormErrorMessage>Ingresa un email válido</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="password">password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="password"
              {...register("password", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>Ingresa un password</FormErrorMessage>
          </FormControl>

          <Button
            mt={4}
            w="100%
            "
            isLoading={isSubmitting}
            type="submit"
            className={styles.button}
          >
            Registrarme
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
