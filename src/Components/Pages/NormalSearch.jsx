import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Center } from "@chakra-ui/layout";
import axios from "axios";
import { Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { LoadingComponent } from "../../App";
import { AccountContext } from "../User/Account";
import { ResultTable } from "./AdvancedSearch";

export default function TextSearch(props) {
  const [query, setQuery] = useState(props.location.state.query || "");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [token, setToken] = useState("");
  const [data, setData] = useState();
  const [first, setFirst] = useState(true);
  const { getSession } = useContext(AccountContext);
  useEffect(() => {
    getSession()
      .then(({ user, ...result }) => {
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

  const submitSearch = async (values, actions) => {
    const data = new FormData();
    data.append("query", query);
    data.append("page", page);
    data.append("token", token);
    const headers = { "Content-Type": "multipart/form-data" };
    return axios.post("/search", data, headers).then((res) => {
      setCount(res.data.search_files_aggregate.aggregate.count);
      setData(res.data);
    });
  };
  if (first) {
    setFirst(false);
    submitSearch();
  }
  return (
    <>
      <Formik initialValues={{}} onSubmit={submitSearch}>
        {({ isSubmitting, submitForm }) => {
          return (
            <Form>
              <Box bg="primary.500" textAlign="center" pt={5} pb={3}>
                <Center color="black">
                  <Box fontSize="4xl" pb={10} textColor="white"></Box>
                </Center>
                <Box textAlign="center" mt={5} mb={3} {...props}>
                  <Input
                    placeholder="بحث..."
                    bg="white"
                    w="50%"
                    size="lg"
                    me={2}
                    rounded={"full"}
                    zIndex={3}
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                    }}
                  ></Input>
                  <Button
                    size="lg"
                    fontSize="xl"
                    textColor="white"
                    bg={["primary.700"]}
                    _hover={{
                      bg: ["primary.400"],
                    }}
                    me={3}
                    ml="-4.4em"
                    mb={0.5}
                    _focus={{
                      outline: "none",
                      border: "none",
                    }}
                    rounded={"full"}
                    zIndex={4}
                    type="submit"
                    onClick={() => {
                      setPage(1);
                      submitForm();
                    }}
                  >
                    بحث
                  </Button>
                </Box>
              </Box>
              {isSubmitting || !data ? (
                <LoadingComponent text="جاري البحث، الرجاء اﻹنتظار ..."></LoadingComponent>
              ) : (
                parseInt(data.search_files_aggregate.aggregate.count) !== 0 && (
                  <>
                    <Center pt={5} bg="primary.100" fontSize="xl">
                      <ResultTable
                        data={data.search_files}
                        token={token}
                      ></ResultTable>
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
                        disabled={page === 1 || isSubmitting}
                        me={2}
                        onClick={() => {
                          setPage(page - 1);
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
                        disabled={count / 10 <= page || isSubmitting}
                        onClick={() => {
                          setPage(page + 1);
                          submitForm();
                        }}
                        rounded={"full"}
                      >
                        التالي
                      </Button>
                    </Center>
                  </>
                )
              )}
              {data &&
                data.search_files_aggregate.aggregate.count === 0 &&
                !isSubmitting && (
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
}
