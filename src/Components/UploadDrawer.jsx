import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Drawer,
  DrawerOverlay,
  DrawerBody,
  Box,
  Input,
  DrawerHeader,
  DrawerContent,
  Stack,
  DrawerFooter,
  Button,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";

function UploadFile({ idToken, file, data }) {
  const options = {
    headers: {
      Authorization: idToken,
    },
  };
  const finalData = new FormData();
  finalData.append("file", file);
  for (const property in data) {
    finalData.append(property, data[property]);
  }

  axios
    .post(
      `${process.env.REACT_APP_SERVER_URL}upload_file`,
      finalData,
      options
    )
    .then(
      ({ data }) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
}
export const UploadDrawer = ({ isOpen, onClose, idToken }) => {
  const [files, setFiles] = useState([]);
  const submitFile = (data, { setSubmitting }) => {
    setSubmitting(true);
    UploadFile({ idToken, file: files[0], data });
    console.log(data);
    setSubmitting(false);
  };
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <Formik
            initialValues={{
              university: 0,
              college: 0,
              major: 0,
              course: 0,
              kind: 0,
            }}
            onSubmit={submitFile}
          >
            {({ isSubmitting }) => (
              <Form encType="multipart/form-data">
                <DrawerHeader borderBottomWidth="1px">
                  رفع ملف جديد
                </DrawerHeader>

                <DrawerBody>
                  <Stack spacing={4}>
                    <FormControl>
                      <Input
                        name="file"
                        type="file"
                        as={Input}
                        onChange={(event) =>
                          setFiles(event.target.files)
                        }
                      ></Input>
                    </FormControl>
                    <FormControl>
                      <FormLabel>الجامعة</FormLabel>
                      <Field name="university" as={Select}>
                        <option
                          value={0}
                          label="جامعة بوليتكنيك فلسطين"
                        ></option>
                        <option
                          value={1}
                          label="جامعة بيرزيت"
                        ></option>
                        <option
                          value={2}
                          label="جامعة النجاح"
                        ></option>
                      </Field>
                    </FormControl>

                    <FormControl>
                      <FormLabel>الكلية</FormLabel>
                      <Field name="College" as={Select}>
                        <option
                          value={0}
                          label="كلية الهندسة"
                        ></option>
                        <option
                          value={1}
                          label="كلية الهندسة"
                        ></option>
                        <option
                          value={2}
                          label="كلية الهندسة"
                        ></option>
                      </Field>
                    </FormControl>

                    <FormControl>
                      <FormLabel>التخصص</FormLabel>
                      <Field name="major" as={Select}>
                        <option
                          value={0}
                          label="هندسة حاسوب"
                        ></option>
                        <option
                          value={1}
                          label="هندسة حاسوب"
                        ></option>
                        <option
                          value={2}
                          label="هندسة حاسوب"
                        ></option>
                      </Field>
                    </FormControl>

                    <FormControl>
                      <FormLabel>المساق</FormLabel>
                      <Field name="Course" as={Select}>
                        <option
                          value={0}
                          label="برمجة حاسوب"
                        ></option>
                        <option
                          value={1}
                          label="برمجة حاسوب"
                        ></option>
                        <option
                          value={2}
                          label="برمجة حاسوب"
                        ></option>
                      </Field>
                    </FormControl>
                    <FormControl>
                      <FormLabel>النوع</FormLabel>
                      <Field name="kind" as={Select}>
                        <option
                          value={0}
                          label="امتحان"
                        ></option>
                        <option
                          value={1}
                          label="امتحان"
                        ></option>
                        <option
                          value={2}
                          label="امتحان"
                        ></option>
                      </Field>
                    </FormControl>
                  </Stack>
                </DrawerBody>

                <DrawerFooter borderTopWidth="1px">
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
                    mx={3}
                    disabled={isSubmitting}
                  >
                    تأكيد
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    إلغاء
                  </Button>
                </DrawerFooter>
              </Form>
            )}
          </Formik>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

function MyDropzone({ setFiles }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
    [setFiles]
  );
  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({ onDrop });

  return (
    <Box {...getRootProps()} borderColor="black" borderWidth={3}>
      <input {...getInputProps()} type="file" />
      {isDragActive ? (
        <p>اضغط هنا لاختيار ملف أو قم بحمله وإلقائه هنا لرفعه</p>
      ) : (
        <p>اضغط هنا لاختيار ملف</p>
      )}
    </Box>
  );
}
