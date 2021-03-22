import { DownloadIcon, StarIcon } from "@chakra-ui/icons";
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
  Icon,
  Grid,
  GridItem,
  Stack,
  Table,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik, useFormikContext } from "formik";
import { useContext, useEffect, useState } from "react";
import useSWR, { cache } from "swr";
import { LoadingComponent } from "../../App";
import { AccountContext } from "../User/Account";
import {
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

const AdvancedSearch = () => {
  const { getSession } = useContext(AccountContext);
  const [token, setToken] = useState("");

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
    .catch(() => {});

  const [universities, setUniversities] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [majors, setMajors] = useState([]);
  // const [courses, setCourses] = useState([]);
  const [kinds, setKinds] = useState([]);
  const [results, setResults] = useState();
  const { data } = useSWR("/get_filter_data");
  useEffect(() => {
    if (!data) return;
    setUniversities(data.universities);
    setColleges(data.universities[0].colleges);
    setMajors(data.universities[0].colleges[0].majors);
    // setCourses(data.universities[0].colleges[0].majors[0].courses);
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

      if (colleges.length === 0) return;
      const m = colleges.filter((x) => x.id === parseInt(values.college))[0]
        .majors;
      setMajors(m);

      if (m.filter((elem) => values.major == elem.id).length === 0)
        setFieldValue("major", m[0].id);
    }, [values]);

    return null;
  };

  const submitSearch = async (values, actions) => {
    actions.setSubmitting(true);
    const res = await axios.get(
      "/get_search_results/" +
        values.major +
        "/" +
        values.kind +
        "/" +
        values.page
    );
    const data = await res.data;
    setResults(data.files);
    actions.setValues((prevValues) => ({
      ...prevValues,
      count: data.files_aggregate.aggregate.totalCount,
    }));
    console.log(values);
  };
  return (
    <>
      <Formik
        initialValues={{
          university: 1,
          college: 1,
          major: 1,
          kind: 1,
          page: 1,
          count: 0,
        }}
        enableReinitialize={false}
        onSubmit={submitSearch}
      >
        {({ values, isSubmitting, submitForm, setValues, submitCount }) => {
          return (
            <Form>
              <MyOnChangeComponent />
              <Center bg="primary.500" pt={10} pb={5} width="100%">
                <SimpleGrid width="95%">
                  <SimpleGrid columns={[1, 1, 2, 4]} gap={2}>
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
                    {/* <FormControl>
                      <FormLabel>المساق</FormLabel>
                      <Field name="course" as={Select} bg="white" fontSize="xl">
                        {courses.map((elem) => (
                          <option
                            key={elem.id}
                            value={elem.id}
                            label={elem.name}
                          ></option>
                        ))}
                      </Field>
                    </FormControl> */}
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
                  </SimpleGrid>
                  <Center>
                    <Button
                      mt={5}
                      size="lg"
                      rounded="md"
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
                      disabled={isSubmitting}
                      onClick={() => {
                        setValues((prevValues) => ({
                          ...prevValues,
                          page: 1,
                        }));
                        submitForm();
                      }}
                      rounded={"full"}
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
                      color="white"
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
                    >
                      السابق
                    </Button>
                    <Button
                      mt={2}
                      mb={10}
                      bg="primary.400"
                      color="white"
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

const ResultTable = ({ data, token }) => {
  if (data.length === 0) {
    return <></>;
  }
  return (
    <Box width={["95%", "95%", "70%"]}>
      <Table rounded={10} bg="white" borderColor="primary.500" borderWidth={2}>
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
      <Td>
        <Text noOfLines={1}></Text>
      </Td>
      <Td>
        <Text noOfLines={1}>الاسم</Text>
      </Td>
      <Td>
        <Text noOfLines={1} lineHeight="normal">
          النوع
        </Text>
      </Td>
      <Td>
        <Text noOfLines={1}>المساق</Text>
      </Td>
      <Td>
        <Text noOfLines={1}>بواسطة</Text>
      </Td>
    </Tr>
  );
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
      <Td {...props} width="5%">
        <a href={link} target="_blank" rel="noopener noreferrer">
          <IconButton
            bg="transparent"
            onClick={() => {
              setSubmitting(true);
              DownloadFile({ id, token, setSubmitting, link });
            }}
            disabled={submitting}
            icon={<DownloadIcon />}
          ></IconButton>
        </a>
      </Td>
      <Td
        {...props}
        onClick={() => {
          window.location = "/file/" + id;
        }}
        width="25%"
      >
        {/* <IconButton icon={<StarIcon />} bg="transparent" /> */}
        <Text noOfLines={1}>{name}</Text>
      </Td>
      <Td
        {...props}
        onClick={() => {
          window.location = "/file/" + id;
        }}
        width="25%"
      >
        <Text noOfLines={1}>{kindByKind.name}</Text>
      </Td>
      <Td
        {...props}
        onClick={() => {
          window.location = "/file/" + id;
        }}
        width="20%"
      >
        <Text noOfLines={1}>{courseByCourse.name}</Text>
      </Td>
      <Td
        {...props}
        onClick={() => {
          window.location = "/file/" + id;
        }}
        width="25%"
      >
        <Text noOfLines={1}>{username}</Text>
      </Td>
    </Tr>
  );
};

function DownloadFile({ id, token, link, setSubmitting }) {
  const data = new FormData();
  data.append("file_id", id);
  data.append("token", token);
  axios.post("/set_download", data);
  window.location = link;
}
export default AdvancedSearch;
