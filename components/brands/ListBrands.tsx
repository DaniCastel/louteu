import Image from "next/image";
import { Grid, GridItem, Heading, Box } from "@chakra-ui/react";

type Props = {
  brands: TBrand[];
};

export function ListBrands({ brands }: Props) {
  const renderedBrands = brands.map((brand, key) => (
    <GridItem key={key} textAlign="center">
      <Box
        position="relative"
        rounded={"full"}
        overflow={"hidden"}
        width={"200px"}
        height={"200px"}
        shadow="lg"
        bg="white"
      >
        <Image
          src={brand.image.url}
          layout="fill"
          alt={brand.name}
          objectFit="contain"
        ></Image>
      </Box>
      <Heading as="h3" size="lg" p={2}>
        {brand.name}
      </Heading>
    </GridItem>
  ));
  return (
    <Grid
      gridTemplateColumns="repeat(auto-fill,minmax(300px,1fr))"
      gap={8}
      justifyItems={"center"}
    >
      {renderedBrands}
    </Grid>
  );
}
