import { CreateBrand } from "@/components/home/createBrand";

import withAdmin from "pages/withAdmin";
import { GetStaticProps } from "next";
import axios from "axios";
import { API } from "@/config/";

interface Props {
  user: {
    name: string;
    email: string;
    role: string;
    _id: string;
  };
  token: any;
}

function Marcas({ user, token, brands }: Props) {
  console.log(token);
  return (
    <div>
      <CreateBrand token={token}></CreateBrand>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await axios.get(`${API}/brands`);
    return {
      props: { categories: response.data.brands || [] },
    };
  } catch (error) {
    return {
      props: { brands: [] },
    };
  }
};

export default withAdmin(Marcas);
