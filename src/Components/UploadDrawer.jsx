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
} from "@chakra-ui/react";
import { Formik, Form, Field, useFormikContext } from "formik";
import axios from "axios";

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
    .post(`${process.env.REACT_APP_SERVER_URL}upload_file`, finalData, options)
    .then(
      ({ data }) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
}
export const UploadDrawer = ({ isOpen, onClose, idToken, schoolData }) => {
  const [files, setFiles] = useState([]);
  const submitFile = (data, { setSubmitting }) => {
    setSubmitting(true);
    UploadFile({ idToken, file: files[0], data });
    console.log(data);
    setSubmitting(false);
  };

  const [universities, setUniversities] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [majors, setMajors] = useState([]);
  // const [courses, setCourses] = useState([]);
  const [kinds, setKinds] = useState([]);

  useEffect(() => {
    if (schoolData == null) return;
    setUniversities(schoolData.universities);
    setColleges(schoolData.universities[0].colleges);
    setMajors(schoolData.universities[0].colleges[0].majors);
    setKinds(schoolData.kinds);
  }, [schoolData]);

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
            }}
            onSubmit={submitFile}
          >
            {({ isSubmitting }) => (
              <Form encType="multipart/form-data">
                <MyOnChangeComponent />

                <DrawerHeader borderBottomWidth="1px">
                  رفع ملف جديد
                </DrawerHeader>

                <DrawerBody>
                  <Stack spacing={4}>
                    <FormControl>
                      <Field
                        name="file"
                        type="file"
                        as={Input}
                        onChange={(event) => setFiles(event.target.files)}
                        accept=".pdf"
                      ></Field>
                    </FormControl>
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
