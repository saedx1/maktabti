import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import {
  Box,
  Input,
  Button,
  Select,
  FormLabel,
  FormControl,
  Flex,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import UserPool from "../User/UserPool";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import useSWR from "swr";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "اﻹسم قصير جداً")
    .required("يرجى إدخال الاسم الشخصي"),
  email: Yup.string()
    .email("البريد المدخل غير صحيح!")
    .required("يرجى إدخال البريد اﻹلكتروني"),
  password: Yup.string()
    .min(8, "يجب أن تتكون كلمة المرور من 8 رموز على اﻷقل")
    .required("يرجى إدخال كلمة المرور"),
});

const onSubmit = (data, actions, toast) => {
  actions.setSubmitting(true);
  const attrs = [
    new CognitoUserAttribute({
      Name: "name",
      Value: data.name,
    }),
    new CognitoUserAttribute({
      Name: "custom:university",
      Value: `${data.university}`,
    }),
  ];
  UserPool.signUp(data.email, data.password, attrs, null, (err, data) => {
    if (err) {
      toast({
        title: "حصل خلل أثناء التسجيل",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      actions.setSubmitting(false);
    } else {
      toast({
        title: "تم التسجيل بنجاح، يرجى تسجيل الدخول",
        // title: "تم التسجيل بنجاح، يرجى تفقد البريد اﻹلكتروني لتأكيد التسجيل",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  });
};

const Signup = () => {
  const toast = useToast();

  const { data } = useSWR("/get_universities");

  return (
    <Flex align={"center"} justify={"center"} bg={"primary.100"}>
      <Stack width="100%" spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box rounded={"lg"} bg={"primary.white"} boxShadow={"lg"} p={8}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              university: 1,
            }}
            onSubmit={(data, actions) => onSubmit(data, actions, toast)}
            validationSchema={SignupSchema}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <Stack spacing={4}>
                  <FormControl>
                    <FormLabel fontSize="xl">الاسم</FormLabel>
                    <Field
                      name="name"
                      as={Input}
                      type="text"
                      bg="primary.white"
                      fontSize="xl"
                      disabled={isSubmitting}
                    ></Field>
                    {errors.name && touched.name ? (
                      <Box color="red">{errors.name}</Box>
                    ) : null}
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="xl">البريد الإلكتروني</FormLabel>
                    <Field
                      name="email"
                      as={Input}
                      type="text"
                      bg="primary.white"
                      fontSize="xl"
                      disabled={isSubmitting}
                    ></Field>
                    {errors.email && touched.email ? (
                      <Box color="red">{errors.email}</Box>
                    ) : null}
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="xl">كلمة المرور</FormLabel>
                    <Field
                      name="password"
                      as={Input}
                      type="password"
                      bg="primary.white"
                      fontSize="xl"
                      disabled={isSubmitting}
                    ></Field>
                    {errors.password && touched.password ? (
                      <Box color="red">{errors.password}</Box>
                    ) : null}
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="xl">الجامعة</FormLabel>
                    <Select
                      bg="primary.white"
                      as={Select}
                      fontSize="xl"
                      disabled={isSubmitting}
                    >
                      {data &&
                        data["universities"].map((elem) => (
                          <option
                            key={elem.id}
                            value={elem.id}
                            label={elem.name}
                          ></option>
                        ))}
                    </Select>
                  </FormControl>
                  <Button
                    bg={"primary.400"}
                    color={"primary.white"}
                    _hover={{
                      bg: "primary.500",
                    }}
                    type="submit"
                    _focus={{
                      outline: "none",
                      border: "none",
                    }}
                    fontSize="xl"
                    disabled={isSubmitting}
                  >
                    تسجيل
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signup;
