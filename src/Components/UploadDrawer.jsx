import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerBody,
  Input,
  DrawerHeader,
  DrawerContent,
  Stack,
  DrawerFooter,
  Button,
  Select,
  FormControl,
  FormLabel,
  useToast,
  Center,
} from "@chakra-ui/react";
import { Formik, Form, Field, useFormikContext } from "formik";
import axios from "axios";
import useSWR from "swr";

async function UploadFile({ idToken, data }) {
  const options = {
    headers: {
      Authorization: idToken,
    },
  };
  const finalData = new FormData();
  for (const property in data) {
    if (property === "files") {
      finalData.append("file", data[property][0]);
    } else {
      finalData.append(property, data[property]);
    }
  }
  finalData.append("token", idToken);

  return await axios.post("/upload_file", finalData, options);
}
export const UploadDrawer = ({ isOpen, onClose, idToken, schoolData }) => {
  const toast = useToast();
  const submitFile = (data, actions) => {
    actions.setSubmitting(true);
    UploadFile({ idToken, data })
      .then((res) => {
        toast({
          title: "تم رفع الملف بنجاح",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
        actions.resetForm();
      })
      .catch((err) => {
        toast({
          title: "حصل خلل أثناء رفع الملف",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        actions.setSubmitting(false);
      });
  };

  const [universities, setUniversities] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [majors, setMajors] = useState([]);
  // const [courses, setCourses] = useState([]);
  const [kinds, setKinds] = useState([]);

  const { data } = useSWR("/get_filter_data");

  useEffect(() => {
    if (!data) return;
    setUniversities(data.universities);
    setColleges(data.universities[0].colleges);
    setMajors(data.universities[0].colleges[0].majors);
    setKinds(data.kinds);
  }, [data]);

  const MyOnChangeComponent = () => {
    const { values } = useFormikContext();
    useEffect(() => {
      if (universities.length === 0) return;
      setColleges(
        universities.filter((x) => x.id === parseInt(values.university))[0]
          .colleges
      );

      if (colleges.length === 0) return;
      setMajors(
        colleges.filter((x) => x.id === parseInt(values.college))[0].majors
      );
    }, [values.university, values.college]);

    return null;
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <Formik
            initialValues={{
              university: 1,
              college: 1,
              major: 1,
              course: "",
              kind: 1,
              files: [],
              year: 2020,
            }}
            onSubmit={submitFile}
          >
            {({ values, isSubmitting, setFieldValue }) => (
              <Form encType="multipart/form-data">
                <MyOnChangeComponent />

                <DrawerHeader borderBottomWidth="1px">
                  رفع ملف جديد
                </DrawerHeader>

                <DrawerBody>
                  <Stack spacing={4}>
                    <FormControl>
                      <FileUploader
                        name="file"
                        id="file"
                        onChange={(event) =>
                          setFieldValue("files", event.currentTarget.files)
                        }
                        accept=".pdf"
                        filename={
                          values.files.length === 0 ? "" : values.files[0].name
                        }
                      ></FileUploader>
                    </FormControl>
                    {/* <FormControl>
                      <Field
                        name="file"
                        type="file"
                        as={Input}
                        onChange={(event) =>
                          setFieldValue("files", event.currentTarget.files)
                        }
                        accept=".pdf"
                      ></Field>
                    </FormControl> */}
                    <FormControl>
                      <FormLabel>الجامعة</FormLabel>
                      <Field
                        name="university"
                        as={Select}
                        bg="white"
                        fontSize="xl"
                      >
                        {universities.map((elem) => (
                          <option
                            key={elem.id}
                            value={elem.id}
                            label={elem.name}
                          ></option>
                        ))}
                      </Field>
                    </FormControl>

                    <FormControl>
                      <FormLabel>الكلية</FormLabel>
                      <Field
                        name="college"
                        as={Select}
                        bg="white"
                        fontSize="xl"
                      >
                        {colleges.map((elem) => (
                          <option
                            key={elem.id}
                            value={elem.id}
                            label={elem.name}
                          ></option>
                        ))}
                      </Field>
                    </FormControl>

                    <FormControl>
                      <FormLabel>التخصص</FormLabel>
                      <Field name="major" as={Select} bg="white" fontSize="xl">
                        {majors.map((elem) => (
                          <option
                            key={elem.id}
                            value={elem.id}
                            label={elem.name}
                          ></option>
                        ))}
                      </Field>
                    </FormControl>

                    <FormControl>
                      <FormLabel>المساق</FormLabel>
                      <Field
                        name="course"
                        as={Input}
                        type="text"
                        bg="white"
                        fontSize="xl"
                      ></Field>
                    </FormControl>
                    <FormControl>
                      <FormLabel>السنة</FormLabel>
                      <Field
                        name="year"
                        as={Input}
                        type="numeric"
                        bg="white"
                        fontSize="xl"
                      ></Field>
                    </FormControl>
                    <FormControl>
                      <FormLabel>النوع</FormLabel>
                      <Field name="kind" as={Select} bg="white" fontSize="xl">
                        {kinds.map((elem) => (
                          <option
                            key={elem.id}
                            value={elem.id}
                            label={elem.name}
                          ></option>
                        ))}
                      </Field>
                    </FormControl>
                  </Stack>
                </DrawerBody>

                <DrawerFooter>
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

function FileUploader(props) {
  return (
    <>
      <style>
        {`
                .inputfile {
                      /* visibility: hidden etc. wont work */
                      width: 0.1px;
                      height: 0.1px;
                      opacity: 0;
                      overflow: hidden;
                      position: absolute;
                      z-index: -1;
                    }
                    .inputfile:focus + label {
                      /* keyboard navigation */
                      outline: 1px dotted #000;
                      outline: -webkit-focus-ring-color auto 5px;
                    }
                    .inputfile + label * {
                      pointer-events: none;
                    }
                    `}
      </style>

      <FormLabel
        htmlFor="file"
        borderStyle="solid"
        border="1px solid #ccc"
        bg="primary.100"
        _hover={{
          bg: "primary.300",
        }}
        fontSize="xl"
      >
        <Center>اضغط هنا ﻹختيار ملف</Center>
      </FormLabel>
      <Field
        id="file"
        type="file"
        {...props}
        className="inputfile"
        as={Input}
      />
      <div>{props.filename}</div>
    </>
  );
}

// function MyDropzone({ setFiles }) {
//   const onDrop = useCallback(
//     (acceptedFiles) => {
//       setFiles(acceptedFiles);
//     },
//     [setFiles]
//   );
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <Box {...getRootProps()} borderColor="black" borderWidth={3}>
//       <input {...getInputProps()} type="file" />
//       {isDragActive ? (
//         <p>اضغط هنا لاختيار ملف أو قم بحمله وإلقائه هنا لرفعه</p>
//       ) : (
//         <p>اضغط هنا لاختيار ملف</p>
//       )}
//     </Box>
//   );
// }
