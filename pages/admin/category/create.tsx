import { Typography } from "antd";
import Head from "next/head";

import withAdmin from "pages/withAdmin";
import CategoryForm from "@/components/category/categoryForm";

const { Title } = Typography;

const Create = ({ token }) => {
  return (
    <>
      <Head>
        <title>Create category</title>
      </Head>
      <CategoryForm token={token}></CategoryForm>
    </>
  );
};

export default withAdmin(Create);
