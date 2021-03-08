import {
  Box,
  Center,
  Select,
  FormLabel,
  Button,
  SimpleGrid,
  Text,
  FormControl,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { date } from "yup";

const AdvancedSearch = () => {
  const [universities, setUniversities] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [majors, setMajors] = useState([]);
  // const [courses, setCourses] = useState([]);
  const [kinds, setKinds] = useState([]);
  const [results, setResults] = useState([]);
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
    const res = await axios.get("/get_search_results/" + values.major);
    const data = await res.data;
    setResults(data.files);
  };
  return (
    <>
      <Formik
        initialValues={{
          university: 1,
          college: 1,
          major: 1,
          kind: 1,
        }}
        enableReinitialize={false}
        onSubmit={submitSearch}
      >
        {({ values, isSubmitting }) => {
          return (
            <Form>
              <MyOnChangeComponent />
              <Center bg="primary.100" pt={10}>
                <SimpleGrid>
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
                      bg="primary.400"
                      color="white"
                      fontSize="2xl"
                      _focus={{
                        outline: "none",
                        border: "none",
                      }}
                      disabled={isSubmitting}
                      type="submit"
                    >
                      بحث
                    </Button>
                  </Center>
                </SimpleGrid>
              </Center>
            </Form>
          );
        }}
      </Formik>
      {data ? (
        <Center pt={5} bg="primary.100" fontSize="xl">
          <ResultTable data={results}></ResultTable>
        </Center>
      ) : null}
    </>
  );
};

const ResultTable = ({ data }) => {
  if (data.length === 0) {
    return <></>;
  }
  console.log(data);
  return (
    <Box width={["95%", "95%", "70%"]}>
      <SimpleGrid
        templateColumns="1fr 1fr 1.5fr 1.5fr 2fr 2fr"
        columns={6}
        bg="white"
        rounded={10}
        p={2}
        borderColor="primary.500"
        borderWidth={2}
      >
        <ResultHeader
          bg="primary.400"
          pb={1}
          pt={1}
          textColor="white"
        ></ResultHeader>
        {data.map((elem, i) => (
          <>
            <ResultRow
              {...elem}
              pb={1}
              pt={1}
              _hover={{
                bg: "primary.200",
              }}
              key={i}
            ></ResultRow>
            <ResultRow
              {...elem}
              pb={1}
              pt={1}
              _hover={{
                bg: "primary.200",
              }}
              key={i}
            ></ResultRow>
          </>
        ))}
      </SimpleGrid>
    </Box>
  );
};

const ResultHeader = (props) => {
  return (
    <>
      <Center {...props}>
        <Text noOfLines={1}>الاسم</Text>
      </Center>
      <Center {...props}>
        <Text noOfLines={1}>النوع</Text>
      </Center>
      <Center {...props}>
        <Text noOfLines={1}>المساق</Text>
      </Center>
      <Center {...props}>
        <Text noOfLines={1}>التخصص</Text>
      </Center>
      <Center {...props}>
        <Text noOfLines={1}>الجامعة</Text>
      </Center>
      <Center {...props}>
        <Text noOfLines={1}>بواسطة</Text>
      </Center>
    </>
  );
};

const ResultRow = ({
  universityByUniversity,
  collegeByCollege,
  majorByMajor,
  courseByCourse,
  created_by,
  kindByKind,
  link,
  ...props
}) => {
  console.log("Hello");

  return (
    <>
      <Center {...props}>
        <Text noOfLines={1}>
          <a href={link}>Download me</a>
        </Text>
      </Center>
      <Center {...props}>
        <Text noOfLines={1}>{kindByKind.name}</Text>
      </Center>
      <Center {...props}>
        <Text noOfLines={1}>{courseByCourse.name}</Text>
      </Center>
      <Center {...props}>
        <Text noOfLines={1}>{majorByMajor.name}</Text>
      </Center>
      <Center {...props}>
        <Text noOfLines={1}>{universityByUniversity.name}</Text>
      </Center>
      <Center {...props}>
        <Text noOfLines={1}>{created_by}</Text>
      </Center>
    </>
  );
};

export default AdvancedSearch;
