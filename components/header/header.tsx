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
  src: string;
};

export function Header({ title, src }: Props) {
  return (
    <Flex
      w={"full"}
      height="200px"
      backgroundImage={src}
      backgroundSize={"cover"}
      backgroundPosition={"bottom"}
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
