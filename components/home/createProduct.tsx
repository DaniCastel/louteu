import { useRef } from "react";
import { useForm } from "react-hook-form";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import { FileUpload } from "@/components/elements/fileUploader";

export function CreateProduct() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const inputRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function onSubmit(values: { [key: string]: string }) {
    console.log("onSubmit", values);
  }

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear producto</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor="name" pt={4}>
                  Nombre
                </FormLabel>
                <Input
                  id="name"
                  placeholder="name"
                  {...register("name", {
                    required: true,
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormLabel htmlFor="description" pt={4}>
                  Descripción
                </FormLabel>
                <Input
                  id="description"
                  placeholder="description"
                  {...register("description", {
                    required: true,
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />

                <FileUpload
                  placeholder="Seleccionar imágen"
                  acceptedFileTypes="image/*"
                  control={control}
                  inputRef={inputRef}
                  {...register("description", {
                    required: true,
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                ></FileUpload>
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button isLoading={isSubmitting} type="submit">
              Crear
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
