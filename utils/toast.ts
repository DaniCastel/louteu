import { createStandaloneToast } from "@chakra-ui/react";

const toast = createStandaloneToast();

type ToastType = "info" | "warning" | "success" | "error" | undefined;

function openToast(type: ToastType, description: string): void {
  toast({
    description: description,
    status: type,
    duration: 9000,
  });
}

export { openToast };
