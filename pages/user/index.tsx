import {
  GetStaticProps,
  GetServerSideProps,
  GetStaticPropsContext,
  GetServerSidePropsContext,
  GetStaticPropsResult,
  GetServerSidePropsResult,
} from "next";
import axios from "axios";

import { API } from "../../config";
import { getCookie } from "../../helpers/auth";

interface Props {
  user: {
    name: string;
    email: string;
    role: string;
    _id: string;
  };
}

function User({ user }: Props) {
  return <div>{JSON.stringify(user)}</div>;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = getCookie("token", context.req);
  try {
    const response = await axios.get(`${API}/user`, {
      headers: {
        authorization: `Bearer ${token}`,
        contentType: "application/json",
      },
    });
    return { props: { user: response.data } };
  } catch (error: any) {
    return {
      redirect: {
        destination: "/",
        statusCode: 307,
      },
    };
  }
};

export default User;
