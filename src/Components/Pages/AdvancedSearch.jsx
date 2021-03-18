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
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik, useFormikContext } from "formik";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { AccountContext } from "../User/Account";

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
    const res = await axios.get(
      "/get_search_results/" + values.major + "/" + values.kind
    );
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
          <ResultTable data={results.slice(0, 10)} token={token}></ResultTable>
        </Center>
      ) : null}
    </>
  );
};

const ResultTable = ({ data, token }) => {
  if (data.length === 0) {
    return <></>;
  }
  return (
    <Box width={["95%", "95%", "70%"]} mb="10">
      <SimpleGrid
        templateColumns="0.5fr 2fr 1fr 1.5fr 2fr"
        columns={5}
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
        {data.map((elem) => (
          <ResultRow
            key={elem.name}
            pb={1}
            pt={1}
            token={token}
            {...elem}
          ></ResultRow>
        ))}
      </SimpleGrid>
    </Box>
  );
};

const ResultHeader = (props) => {
  return (
    <>
      <Center {...props}>
        <Text noOfLines={1}></Text>
      </Center>
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
        <Text noOfLines={1}>بواسطة</Text>
      </Center>
    </>
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
    <>
      <Center {...props}>
        <Button
          bg="transparent"
          onClick={() => {
            setSubmitting(true);
            DownloadFile({ id, token, setSubmitting });
          }}
          disabled={submitting}
        >
          <a href={link} target="_blank" rel="noopener noreferrer">
            <DownloadIcon />
          </a>
        </Button>
      </Center>
      <Center {...props}>
        {/* <IconButton icon={<StarIcon />} bg="transparent" /> */}
        <Text noOfLines={1}>{name}</Text>
      </Center>
      <Center {...props}>
        <Text noOfLines={1}>{kindByKind.name}</Text>
      </Center>
      <Center {...props}>
        <Text noOfLines={1}>{courseByCourse.name}</Text>
      </Center>
      <Center {...props}>
        <Text noOfLines={1}>{username}</Text>
      </Center>
    </>
  );
};

function DownloadFile({ id, token, link, setSubmitting }) {
  const data = new FormData();
  data.append("file_id", id);
  data.append("token", token);
  axios.post("/set_download", data);
}
export default AdvancedSearch;
