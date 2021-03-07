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
import { Field, Form, Formik, useFormikContext } from "formik";
import { useEffect, useState } from "react";

const AdvancedSearch = ({ schoolData }) => {
  const [universities, setUniversities] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [majors, setMajors] = useState([]);
  // const [courses, setCourses] = useState([]);
  const [kinds, setKinds] = useState([]);

  useEffect(() => {
    setUniversities(schoolData.universities);
    setColleges(schoolData.universities[0].colleges);
    setMajors(schoolData.universities[0].colleges[0].majors);
    setKinds(schoolData.kinds);
  }, [schoolData]);

  const MyOnChangeComponent = () => {
    const { values } = useFormikContext();
    useEffect(() => {
      console.log(values);
      if (universities.length === 0) return;
      setColleges(
        universities.filter((x) => x.id === parseInt(values.university))[0]
          .colleges
      );

      if (colleges.length === 0) return;
      setMajors(
        colleges.filter((x) => x.id === parseInt(values.college))[0].majors
      );
    }, [values]);

    return null;
  };

  return (
    <>
      <Formik
        initialValues={{
          university: 1,
          college: 1,
          major: 1,
          course: 1,
          kind: 1,
        }}
      >
        {({ values }) => {
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
      <Center pt={5} bg="primary.100" fontSize="xl">
        <ResultTable></ResultTable>
      </Center>
    </>
  );
};

const ResultTable = () => {
  const data = {
    course: "فيزياء 1",
    type: "امتحان",
    name: "فيرست",
    major: "هندسة حاسوب",
    university: "جامعة بوليتكنيك فلسطين",
    by: "سعد السيد أحمد",
  };
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
        <ResultRow
          {...data}
          pb={1}
          pt={1}
          _hover={{
            bg: "primary.200",
          }}
        ></ResultRow>
        <ResultRow
          {...data}
          pb={1}
          pt={1}
          bg="primary.100"
          _hover={{
            bg: "primary.200",
          }}
        ></ResultRow>
        <ResultRow
          {...data}
          pb={1}
          pt={1}
          _hover={{
            bg: "primary.200",
          }}
        ></ResultRow>
        <ResultRow
          {...data}
          pb={1}
          pt={1}
          bg="primary.100"
          _hover={{
            bg: "primary.200",
          }}
        ></ResultRow>
        <ResultRow
          {...data}
          pb={1}
          pt={1}
          _hover={{
            bg: "primary.200",
          }}
        ></ResultRow>
        <ResultRow
          {...data}
          pb={1}
          pt={1}
          bg="primary.100"
          _hover={{
            bg: "primary.200",
          }}
        ></ResultRow>
        <ResultRow
          {...data}
          pb={1}
          pt={1}
          _hover={{
            bg: "primary.200",
          }}
        ></ResultRow>
        <ResultRow
          {...data}
          pb={1}
          pt={1}
          bg="primary.100"
          _hover={{
            bg: "primary.200",
          }}
        ></ResultRow>
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

const ResultRow = ({ name, type, course, major, university, by, ...props }) => {
  return (
    <>
      <Center {...props}>
        <Text noOfLines={1}>{name}</Text>
      </Center>
      <Center {...props}>
        <Text noOfLines={1}>{type}</Text>
      </Center>
      <Center {...props}>
        <Text noOfLines={1}>{course}</Text>
      </Center>
      <Center {...props}>
        <Text noOfLines={1}>{major}</Text>
      </Center>
      <Center {...props}>
        <Text noOfLines={1}>{university}</Text>
      </Center>
      <Center {...props}>
        <Text noOfLines={1}>{by}</Text>{" "}
      </Center>
    </>
  );
};

export default AdvancedSearch;
