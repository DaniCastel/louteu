import { useRouter } from "next/router";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Input,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import randomCodeGenerator from "utils/randomCodeGenerator";
import { io } from "socket.io-client";

import { createRoom } from "requests";

function CreateGame() {
  const router = useRouter();
  function validateName(value: string | "") {
    let error;
    if (!value) {
      error = "Name is required";
    }
    return error;
  }

  // function createRoomC(name: string | "") {
  //   const { posts, error } = createRoom("/room");
  //   console.log(error);
  // }

  return (
    <Formik
      initialValues={{ name: "" }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          actions.setSubmitting(false);
          fetch("http://localhost:8000/api/v1/room", {
            method: "POST",
            body: values.name,
          });
          // createRoomC(values.name);
          // router.push(`/planningpoker/${randomCodeGenerator(5)}`);
        }, 1000);
      }}
    >
      {(props) => (
        <Form>
          <Field name="name" validate={validateName}>
            {({ field, form }: { field: any; form: any }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor="name">Game name</FormLabel>
                <Input {...field} id="name" placeholder="name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button mt={4} isLoading={props.isSubmitting} type="submit">
            Create game
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default CreateGame;
