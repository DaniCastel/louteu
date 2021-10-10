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

function CreateGame() {
  const router = useRouter();
  function validateName(value: string | "") {
    let error;
    if (!value) {
      error = "Name is required";
    }
    return error;
  }

  return (
    <Formik
      initialValues={{ name: "" }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
          router.push(`/planningpoker/${randomCodeGenerator(5)}`);
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
