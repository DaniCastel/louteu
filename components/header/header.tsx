import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";

type Props = {
  title: string;
};

export function Header({ title }: Props) {
  return (
    <Flex
      w={"full"}
      height="200px"
      backgroundImage={"url(/images/header/pexels-photo-2113855.jpeg)"}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Text
          color={"white"}
          fontWeight={700}
          lineHeight={1.2}
          fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
        >
          {title}
        </Text>
      </VStack>
    </Flex>
  );
}
