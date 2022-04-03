import { withRouter, Router } from "next/router";
import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

import axios from "axios";

import { openToast } from "utils/toast";
import { Button } from "antd";
import { API } from "config";

import styles from "./activate.module.scss";

interface IToken {
  name: string;
  // whatever else is in the JWT.
}

function ActivateAccount({ router }: { router: Router }) {
  const [state, setState] = useState({
    name: "",
    token: "",
    buttonText: "Activate Account",
    success: "",
    error: "",
  });

  const { name, token, buttonText, success, error } = state;

  useEffect(() => {
    const token = router.query.id as string;
    if (token) {
      const { name } = jwtDecode<IToken>(token);
      setState({ ...state, name, token });
    }
  }, [router]);

  const clickHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    setState({ ...state, buttonText: "Activating" });

    try {
      const response = await axios.post<{
        message: string;
      }>(`${API}/register/activate`, {
        token,
      });
      // console.log(response)
      setState({ ...state, name: "", token: "", buttonText: "Activated" });
      openToast("success", response.data.message);
    } catch (error: any) {
      setState({ ...state, buttonText: "Activate Account" });
      openToast("error", error.response.data.error);
    }
  };

  return (
    <div className={styles.activate}>
      <div className="card">
        <div>Good day {name}, Ready to activate your account?</div>
        <button className="button__primary" onClick={clickHandler}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default withRouter(ActivateAccount);
