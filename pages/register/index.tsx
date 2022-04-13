import { useEffect } from "react";

import { useRouter } from "next/router";

import { isAuth } from "@/helpers/auth";

import styles from "./register.module.scss";
import Register from "@/components/register/register";

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    isAuth() && router.push("/");
  }, []);

  return (
    <div className={styles.container}>
      <Register />
    </div>
  );
}
