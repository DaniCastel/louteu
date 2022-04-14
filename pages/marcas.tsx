import { GetStaticProps } from "next";
import axios from "axios";
import { Box } from "@chakra-ui/react";

import { API } from "@/config/index";
import { TBrand } from "@/types/brand";

import { ListBrands } from "@/components/brands/ListBrands";

import { Header } from "@/components/header/header";

type Props = {
  brands: TBrand[];
};

function Marcas({ brands }: Props) {
  return (
    <>
      <Header title="Marcas"></Header>{" "}
      <Box py={10} px={8}>
        <ListBrands brands={brands}></ListBrands>
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await axios.get(`${API}/brands`);
    return {
      props: { brands: response.data.brands || [] },
    };
  } catch (error) {
    return {
      props: { brands: [] },
    };
  }
};

export default Marcas;
