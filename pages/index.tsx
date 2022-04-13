import { GetStaticProps } from "next";
import axios from "axios";

import { API } from "@/config/index";
import CategoryList from "@/components/category/list";

export default function Home({
  categories,
}: {
  categories: {
    image: string;
    name: string;
    url: string;
  }[];
}) {
  return (
    <>
      <CategoryList categories={categories}></CategoryList>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await axios.get(`${API}/categories`);
    return {
      props: { categories: response.data.categories || [] },
    };
  } catch (error) {
    return {
      props: { categories: [] },
    };
  }
};
