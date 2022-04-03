import { createStandaloneToast } from "@chakra-ui/react";

const toast = createStandaloneToast();

type ToastProps = {
  type: "info" | "warning" | "success" | "error" | undefined;
  description: string;
};

const openToast = ({ type, description }: ToastProps) => {
  toast({
    title: "",
    description: description,
    status: type,
    duration: 9000,
    isClosable: true,
  });
};

export { openToast };
