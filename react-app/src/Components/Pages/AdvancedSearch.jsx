import { DownloadIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Select,
  FormLabel,
  Button,
  SimpleGrid,
  Text,
  FormControl,
  IconButton,
  Table,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useContext, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { LoadingComponent } from "../../App";
import { AccountContext } from "../User/Account";
import { Tbody, Tr, Td } from "@chakra-ui/react";

const AdvancedSearch = () => {
  const { getSession } = useContext(AccountContext);
  const [token, setToken] = useState("");
  useMemo(
    () =>
      getSession()
        .then(({ user }) => {
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
        .catch(() => {}),
    []
  );

  const [universities, setUniversities] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [majors, setMajors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedUniversity, setSelectedU] = useState("1");
  const [selectedCollege, setSelectedC] = useState("1");
  const [selectedMajor, setSelectedM] = useState("1");
  const [, setKinds] = useState([]);
  const [results, setResults] = useState();
  const { data } = useSWR("/get_filter_data");
  useEffect(() => {
    if (!data) return;
    setUniversities(data.universities);
    setColleges(data.universities[0].colleges);
    setMajors(data.universities[0].colleges[0].majors);
    setCourses(data.universities[0].colleges[0].majors[0].courses);
    setKinds(data.kinds);
    console.log(data);
  }, [data]);

  const submitSearch = async (values, actions) => {
    actions.setSubmitting(true);
    const res = await axios.get(
      "/get_search_results/" + values.course + "/" + values.page
    );
    const data = await res.data;
    setResults(data.files);
    actions.setValues((prevValues) => ({
      ...prevValues,
      count: data.files_aggregate.aggregate.totalCount,
    }));
  };

  var setFieldValue1 = null;

  useEffect(() => {
    if (universities.length === 0) return;
    const _colleges = universities.filter(
      (x) => x.id === parseInt(selectedUniversity)
    )[0].colleges;
    setColleges(_colleges);
    setSelectedC(_colleges[0].id);
  }, [universities, selectedUniversity]);

  useEffect(() => {
    if (colleges.length === 0) return;
    if (parseInt(selectedCollege) !== 0) {
      const _majors = colleges.filter(
        (x) => x.id === parseInt(selectedCollege)
      )[0].majors;
      setMajors(_majors);
      setFieldValue1("major", _majors[0].id);
      setSelectedM(_majors[0].id);
    } else {
      setMajors([]);
      setFieldValue1("major", 0);
      const _courses = universities.filter(
        (x) => x.id === parseInt(selectedUniversity)
      )[0].courses;
      setCourses(_courses);
      if (_courses && _courses.length > 0) {
        setFieldValue1("course", _courses[0].id);
      }
    }
  }, [selectedCollege]);

  useEffect(() => {
    if (majors.length === 0) return;
    const _courses = majors.filter((x) => x.id === parseInt(selectedMajor))[0]
      ?.courses;
    if (_courses && _courses.length > 0) {
      setCourses(_courses);
      setFieldValue1("course", _courses[0].id);
    } else {
      if (parseInt(selectedMajor) === 0) {
        const _courses = colleges.filter(
          (x) => x.id === parseInt(selectedCollege)
        )[0].courses;
        setCourses(_courses);
        if (_courses && _courses.length > 0) {
          setFieldValue1("course", _courses[0].id);
        }
      } else {
        setCourses([]);
        setFieldValue1("course", 0);
      }
    }
  }, [selectedMajor]);

  return (
    <>
      <Formik
        initialValues={{
          university: 1,
          college: 1,
          major: 1,
          course: 1,
          kind: 1,
          page: 1,
          count: 0,
        }}
        enableReinitialize={false}
        onSubmit={submitSearch}
      >
        {({
          values,
          isSubmitting,
          submitForm,
          setValues,
          submitCount,
          setFieldValue,
        }) => {
          setFieldValue1 = setFieldValue;
          return (
            <Form>
              <Center bg="primary.500" pt={10} pb={5} width="100%">
                <SimpleGrid width="95%">
                  <SimpleGrid columns={[1, 2, 2, 4]} gap={2}>
                    <FormControl
                      onChange={(e) => {
                        setSelectedU(e.target.value);
                      }}
                    >
                      <FormLabel>الجامعة</FormLabel>
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
                    <FormControl
                      onChange={(e) => {
                        setSelectedC(e.target.value);
                      }}
                    >
                      <FormLabel>الكلية</FormLabel>
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
                    <FormControl
                      onChange={(e) => {
                        setSelectedM(e.target.value);
                      }}
                    >
                      <FormLabel>التخصص</FormLabel>
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
                    <FormControl>
                      <FormLabel>المساق</FormLabel>
                      <Field
                        name="course"
                        as={Select}
                        bg="primary.white"
                        fontSize="xl"
                      >
                        {courses.map((elem) => (
                          <option
                            key={elem.id}
                            value={elem.id}
                            label={elem.name}
                          ></option>
                        ))}
                      </Field>
                    </FormControl>
                    {/* <FormControl>
                      <FormLabel>النوع</FormLabel>
                      <Field name="kind" as={Select} bg="primary.white" fontSize="xl">
                        {kinds.map((elem) => (
                          <option
                            key={elem.id}
                            value={elem.id}
                            label={elem.name}
                          ></option>
                        ))}
                      </Field>
                    </FormControl> */}
                  </SimpleGrid>
                  <Center>
                    <Button
                      mt={5}
                      size="lg"
                      color={["primary.500"]}
                      bg={["primary.white"]}
                      _hover={{
                        bg: ["primary.100"],
                      }}
                      fontSize="xl"
                      _focus={{
                        outline: "none",
                        border: "none",
                      }}
                      disabled={
                        isSubmitting || !courses || courses.length === 0
                      }
                      onClick={() => {
                        setValues((prevValues) => ({
                          ...prevValues,
                          page: 1,
                        }));
                        submitForm();
                      }}
                      rounded="full"
                    >
                      بحث
                    </Button>
                  </Center>
                </SimpleGrid>
              </Center>
              {isSubmitting ? (
                <LoadingComponent text="جاري البحث، الرجاء اﻹنتظار ..."></LoadingComponent>
              ) : results && values.count !== 0 ? (
                <>
                  <Center pt={5} bg="primary.100" fontSize="xl">
                    <ResultTable data={results} token={token}></ResultTable>
                  </Center>
                  <Center>
                    <Button
                      mt={2}
                      mb={10}
                      bg="primary.400"
                      color="primary.white"
                      fontSize="2xl"
                      _focus={{
                        outline: "none",
                        border: "none",
                      }}
                      disabled={values.page === 1 || isSubmitting}
                      me={2}
                      onClick={() => {
                        setValues((prevValues) => ({
                          ...prevValues,
                          page: values.page - 1,
                        }));
                        submitForm();
                      }}
                      rounded={"full"}
                      _hover={{
                        _disabled: {
                          bg: null,
                        },
                      }}
                    >
                      السابق
                    </Button>
                    <Button
                      mt={2}
                      mb={10}
                      bg="primary.400"
                      color="primary.white"
                      fontSize="2xl"
                      _focus={{
                        outline: "none",
                        border: "none",
                      }}
                      disabled={
                        values.count / 10 <= values.page || isSubmitting
                      }
                      onClick={() => {
                        setValues((prevValues) => ({
                          ...prevValues,
                          page: values.page + 1,
                        }));
                        submitForm();
                      }}
                      rounded={"full"}
                      _hover={{
                        _disabled: {
                          bg: null,
                        },
                      }}
                    >
                      التالي
                    </Button>
                  </Center>
                </>
              ) : null}
              {values.count === 0 && submitCount > 0 && !isSubmitting && (
                <Center fontSize="2xl" mt={2}>
                  عذراً، لا يوجد ملفات تطابق البحث
                </Center>
              )}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export const ResultTable = ({ data, token }) => {
  if (data.length === 0) {
    return <></>;
  }
  return (
    <Box width={["95%", "95%", "50%"]}>
      <Table
        bg="primary.white"
        borderColor="primary.500"
        borderWidth={2}
        fontSize={{ base: "sm", lg: "xl" }}
        style={{
          tableLayout: "fixed",
        }}
      >
        <Tbody>
          <ResultHeader bg="primary.400" textColor="black"></ResultHeader>
          {data.map((elem) => (
            <ResultRow
              key={elem.id}
              id={elem.id}
              token={token}
              py={1}
              textColor="primary.600"
              {...elem}
            ></ResultRow>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

const ResultHeader = (props) => {
  return (
    <Tr {...props}>
      <Td width="20px">
        <Text noOfLines={1}></Text>
      </Td>
      <Td>
        <Text noOfLines={1}>الاسم</Text>
      </Td>
      {/* <Td>
        <Text noOfLines={1} lineHeight="normal" >
          النوع
        </Text>
      </Td> */}
      <Td>
        <Text noOfLines={1}>المساق</Text>
      </Td>
      <Td>
        <Text noOfLines={1}>بواسطة</Text>
      </Td>
    </Tr>
  );
};

const truncateText = (text) => {
  // return text.length >= 10 ? text.substring(0, 10) + "..." : text;
  return text;
};

const ResultRow = ({
  name,
  username,
  courseByCourse,
  kindByKind,
  link,
  key,
  id,
  token,
  ...props
}) => {
  const [submitting, setSubmitting] = useState(false);
  return (
    <Tr
      _hover={{
        cursor: "pointer",
        bg: "primary.200",
      }}
    >
      <Td width="20px" {...props}>
        <Center>
          <IconButton
            bg="transparent"
            onClick={() => {
              console.log(link);
              setSubmitting(true);
              DownloadFile({ id, token, setSubmitting, link });
            }}
            disabled={submitting}
            icon={<DownloadIcon />}
          ></IconButton>
        </Center>
      </Td>
      <Td
        {...props}
        onClick={() => {
          window.location = "/file/" + id;
        }}
      >
        {/* <IconButton icon={<StarIcon />} bg="transparent" /> */}
        <Text noOfLines={1} lineHeight="normal">
          {truncateText(name)}
        </Text>
      </Td>
      {/* <Td
        {...props}
        onClick={() => {
          window.location = "/file/" + id
        }}
        width="25%"
      >
        <Text noOfLines={1}>{kindByKind.name}</Text>
      </Td> */}
      <Td
        {...props}
        onClick={() => {
          window.location = "/file/" + id;
        }}
      >
        <Text noOfLines={1} lineHeight="normal">
          {truncateText(courseByCourse.name)}
        </Text>
      </Td>
      <Td
        {...props}
        onClick={() => {
          window.location = "/file/" + id;
        }}
      >
        <Text noOfLines={1} lineHeight="normal">
          {truncateText(username)}
        </Text>
      </Td>
    </Tr>
  );
};

function DownloadFile({ id, token, link, setSubmitting }) {
  const data = new FormData();
  data.append("file_id", id);
  data.append("token", token);
  data.append("link", link);
  axios.post("/set_download", data).then((res) => {
    console.log(res);
    if (res.data.url) {
      const href = res.data.url;
      var anchor = document.createElement("a");
      anchor.href = href;
      anchor.download = href;
      document.body.appendChild(anchor);
      anchor.click();
    }
  });
}
export default AdvancedSearch;
