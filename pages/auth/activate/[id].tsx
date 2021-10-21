import { withRouter, Router } from "next/router";
import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

import axios from "axios";

import { openNotification } from "utils/toast";
import { Button } from "antd";
import { API } from "config";

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
    let token = router.query.id as string;
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
      setState({ ...state, name: "", token: "", buttonText: "Acttivated" });
      openNotification("success", response.data.message);
    } catch (error: any) {
      setState({ ...state, buttonText: "Acttivate Account" });
      openNotification("error", error.response.data.error);
    }
  };

  return (
    <div>
      <div>Good day {name}, Ready to activatte your account?</div>
      <Button onClick={clickHandler}>{buttonText}</Button>
    </div>
  );
}

export default withRouter(ActivateAccount);
