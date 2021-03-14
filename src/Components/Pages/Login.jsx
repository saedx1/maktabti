import React, { useState, useContext } from "react";
import { AccountContext } from "../User/Account";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Center,
  useToast,
} from "@chakra-ui/react";

import * as Yup from "yup";
import { Field, Form, Formik } from "formik";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("البريد المدخل غير صحيح!")
    .required("يرجى إدخال البريد اﻹلكتروني"),
  password: Yup.string()
    .min(2, "كلمة المرور قصيرة جداً!")
    .required("يرجى إدخال كلمة المرور"),
});

const onSubmit = ({ data, toast, authenticate, loginToHome }) => {
  authenticate(data.email, data.password)
    .then(() => {
      loginToHome();
    })
    .catch(() => {
      toast({
        title: "فشل تسجيل الدخول",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    });
};

const loginToHome = () => {
  window.location.href = "/";
};

export default function SimpleCard({ history }) {
  const { authenticate } = useContext(AccountContext);
  const toast = useToast();

  return (
    <Flex align={"center"} justify={"center"} bg={"primary.100"}>
      <Stack width="100%" spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              university: 1,
            }}
            onSubmit={(data, actions) =>
              onSubmit({ data, actions, toast, authenticate, loginToHome })
            }
            validationSchema={SignInSchema}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <Stack spacing={4}>
                  <FormControl id="email">
                    <FormLabel fontSize="xl">البريد الإلكتروني</FormLabel>
                    <Field
                      name="email"
                      as={Input}
                      type="text"
                      bg="white"
                      fontSize="xl"
                      disabled={isSubmitting}
                    ></Field>
                    {errors.email && touched.email ? (
                      <Box color="red">{errors.email}</Box>
                    ) : null}
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel fontSize="xl">كلمة المرور</FormLabel>
                    <Field
                      name="password"
                      as={Input}
                      type="password"
                      bg="white"
                      fontSize="xl"
                      disabled={isSubmitting}
                    ></Field>
                    {errors.password && touched.password ? (
                      <Box color="red">{errors.password}</Box>
                    ) : null}
                  </FormControl>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Link
                        color={"primary.400"}
                        onClick={() => {
                          history.push("/forgotpassword");
                          history.go();
                        }}
                        fontSize="xl"
                      >
                        نسيت كلمة المرور؟
                      </Link>
                      <Link
                        onClick={() => {
                          history.push("/signup");
                          history.go();
                        }}
                        color={"primary.400"}
                      >
                        <Center
                          _hover={{
                            color: "primary.600",
                          }}
                          fontSize="xl"
                        >
                          مستخدم جديد؟
                        </Center>
                      </Link>
                    </Stack>
                    <Button
                      bg={"primary.400"}
                      color={"white"}
                      _hover={{
                        bg: "primary.500",
                      }}
                      type="submit"
                      _focus={{
                        outline: "none",
                        border: "none",
                      }}
                      fontSize="xl"
                    >
                      دخول
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}
// export default Login;
