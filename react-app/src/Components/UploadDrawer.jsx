import { useContext, useEffect, useState } from "react";
import {
  Box,
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
  Progress,
} from "@chakra-ui/react";
import { Formik, Form, Field, useFormikContext } from "formik";
import axios from "axios";
import useSWR from "swr";
import * as Yup from "yup";
import { AccountContext } from "./User/Account";

const UploadFileSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "اسم المحتوى يجب أن يكون 4 رموز على اﻷقل")
    .max(50, "اسم المحتوى يجب أن لا يتعدى 50 رمزاً")
    .required("يرجى ادخال اسم المحتوى (الشابتر اﻷول، امتحان أول ...)"),
  course: Yup.string()
    .min(4, "اسم المساق يجب أن يكون 4 رموز على اﻷقل")
    .max(50, "اسم المساق يجب أن لا يتعدى 50 رمزاً")
    .required("يرجى ادخال اسم المساق"),
  year: Yup.number()
    .min(1990, "السنة يجب أن لا تقل عن 1990")
    .max(new Date().getFullYear(), "السنة يجب أن لا تتعدى السنة الحالية")
    .required("يرجى ادخال سنة لهذا المحتوى"),
});

async function UploadFile({ token, data, onUploadProgress }) {
  const finalData = new FormData();
  for (const property in data) {
    if (property === "files") {
      finalData.append("file", data[property][0]);
    } else {
      finalData.append(property, data[property]);
    }
  }
  finalData.append("filename", data["files"][0].name);
  finalData.append("token", token);

  return await axios.post("/upload_file", finalData, { onUploadProgress });
}

export const UploadDrawer = ({ isOpen, onClose }) => {
  const toast = useToast();

  const [progress, setProgress] = useState(-1);

  const submitFile = (data, actions) => {
    if (!fileState.selected) {
      setFileState({ selected: false, touched: true });
      actions.setSubmitting(false);
      return;
    }
    UploadFile({
      token,
      data,
      onUploadProgress: (event) => {
        setProgress(Math.round((100 * event.loaded) / event.total));
      },
    })
      .then((res) => {
        toast({
          title: "تم رفع الملف بنجاح",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
        setFileState({ selected: false, touched: false });
        setProgress(-1);
        actions.resetForm();
        actions.setSubmitting(false);
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

  const [fileState, setFileState] = useState({
    selected: false,
    touched: false,
  });
  const [, setName] = useState("");
  const [token, setToken] = useState("");
  const [universities, setUniversities] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [majors, setMajors] = useState([]);
  // const [courses, setCourses] = useState([]);
  const [kinds, setKinds] = useState([]);

  const { data } = useSWR("/get_filter_data");

  const { getSession } = useContext(AccountContext);
  useEffect(() => {
    getSession()
      .then(({ user, ...result }) => {
        setName(result.name);
        user.getSession((err, session) => {
          if (err) {
            console.log(err);
          } else if (!session.isValid()) {
            console.log("Invalid session.");
          } else {
            const t = session.getIdToken().getJwtToken();
            setToken(t);
          }
        });
      })
      .catch(() => {});
  }, [getSession]);

  useEffect(() => {
    if (!data) return;
    setUniversities(data.universities);
    setColleges(data.universities[0].colleges);
    setMajors(data.universities[0].colleges[0].majors);
    setKinds(data.kinds);
  }, [data]);

  const MyOnChangeComponent = () => {
    const { values, setFieldValue } = useFormikContext();
    useEffect(() => {
      if (universities.length === 0) return;
      const c = universities.filter(
        (x) => x.id === parseInt(values.university)
      )[0].colleges;
      setColleges(c);

      if (colleges.length === 0 || parseInt(values.college) === 0) return;
      const m = colleges.filter((x) => x.id === parseInt(values.college))[0]
        .majors;
      setMajors(m);

      if (
        m.filter((elem) => values.major === elem.id).length === 0 &&
        parseInt(values.major) !== 0
      )
        setFieldValue("major", m[0].id);
    }, [values.university, values.college]);

    return null;
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <Formik
        initialValues={{
          name: "",
          university: 1,
          college: 1,
          major: 1,
          course: "",
          kind: 1,
          files: [],
          year: 2020,
        }}
        onSubmit={submitFile}
        validationSchema={UploadFileSchema}
      >
        {({ values, isSubmitting, setFieldValue, errors, touched }) => (
          <Form encType="multipart/form-data">
            <MyOnChangeComponent />
            <DrawerOverlay>
              <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">
                  رفع ملف جديد
                </DrawerHeader>

                <DrawerBody>
                  <Stack spacing={4}>
                    <FormControl>
                      <FileUploader
                        name="file"
                        id="file"
                        onChange={(event) => {
                          setFieldValue("files", event.currentTarget.files);
                          const newFileState = {
                            selected: event.currentTarget.files.length !== 0,
                            touched: true,
                          };
                          setFileState(newFileState);
                        }}
                        // accept=".pdf,.zip,.rar,.ppt,.pptx"
                        filename={
                          values.files.length === 0 ? "" : values.files[0].name
                        }
                        fontSize="xl"
                      ></FileUploader>
                      {!fileState.selected && fileState.touched ? (
                        <Box color="red">الرجاء اختيار ملف</Box>
                      ) : null}
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
                      <FormLabel fontSize="xl">اسم المحتوى</FormLabel>
                      <Field
                        name="name"
                        as={Input}
                        type="text"
                        bg="primary.white"
                        fontSize="xl"
                      ></Field>
                      {errors.name && touched.name ? (
                        <Box color="red">{errors.name}</Box>
                      ) : null}
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="xl">المساق</FormLabel>
                      <Field
                        name="course"
                        as={Input}
                        type="text"
                        bg="primary.white"
                        fontSize="xl"
                      ></Field>
                      {errors.course && touched.course ? (
                        <Box color="red">{errors.course}</Box>
                      ) : null}
                    </FormControl>
                    <FormControl fontSize="xl">
                      <FormLabel>السنة</FormLabel>
                      <Field
                        name="year"
                        as={Input}
                        type="numeric"
                        bg="primary.white"
                        fontSize="xl"
                      ></Field>
                      {errors.year && touched.year ? (
                        <Box color="red">{errors.year}</Box>
                      ) : null}
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize="xl">النوع</FormLabel>
                      <Field
                        name="kind"
                        as={Select}
                        bg="primary.white"
                        fontSize="xl"
                      >
                        {kinds.map((elem) => (
                          <option
                            key={elem.id}
                            value={elem.id}
                            label={elem.name}
                          ></option>
                        ))}
                      </Field>
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="xl">الجامعة</FormLabel>
                      <Field
                        name="university"
                        as={Select}
                        bg="primary.white"
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
                      <FormLabel fontSize="xl">الكلية</FormLabel>
                      <Field
                        name="college"
                        as={Select}
                        bg="primary.white"
                        fontSize="xl"
                      >
                        <option value={0}>عام</option>
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
                      <FormLabel fontSize="xl">التخصص</FormLabel>
                      <Field
                        name="major"
                        as={Select}
                        bg="primary.white"
                        fontSize="xl"
                        disabled={parseInt(values.college) === 0}
                      >
                        <option value={0}>عام</option>
                        {majors.map((elem) => (
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
                    color={"primary.white"}
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
                    fontSize="xl"
                    rounded="full"
                  >
                    تأكيد
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onClose}
                    disabled={isSubmitting}
                    fontSize="xl"
                    rounded="full"
                  >
                    إلغاء
                  </Button>
                </DrawerFooter>
                <Progress
                  hasStripe
                  value={progress}
                  mb={5}
                  hidden={progress === -1}
                  colorScheme="red"
                />
              </DrawerContent>
            </DrawerOverlay>
          </Form>
        )}
      </Formik>
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

      {/* <Center>اﻹمتدادات المسموحة: pdf, zip, rar</Center> */}
      <Center>الحد اﻷقصى لحجم الملف: 20MB</Center>
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
      <Center dir="ltr">{props.filename}</Center>
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
