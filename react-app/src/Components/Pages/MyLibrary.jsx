import {
  SimpleGrid,
  Center,
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Text,
  Thead,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { Card } from "../Card";
import { AccountContext } from "../User/Account";

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const MyLibrary = () => {
  const headers = [
    { name: "", width: "17%" },
    { name: "الاسم", width: "28%" },
    { name: "المساق ", width: "28%" },
    { name: "الجامعة ", width: "27%" },
  ];
  const [data, setData] = useState({});
  let query = useQuery();

  function GetLibrary() {
    axios.get("/get_library?user=" + query.get("user")).then((res) => {
      setData(res.data);
    });
  }

  useEffect(() => {
    GetLibrary();
  }, []);

  return (
    <Center bg="primary.100" width="100%">
      <Box width={["95%", "95%", "60%"]} mt={10}>
        {data && (
          <>
            <Center fontSize="3xl" bg="primary.100" p={5}>
              {query.get("user")}
            </Center>
            <LibraryTable headers={headers} data={data} k={"files"} />
          </>
        )}
      </Box>
    </Center>
  );
};

const LibraryTable = ({ headers, data, k }) => {
  return (
    <Table
      bg="primary.white"
      borderColor="primary.500"
      borderWidth={2}
      fontSize={{ base: "sm", lg: "xl" }}
      style={{
        tableLayout: "fixed",
      }}
      mb={5}
    >
      <Thead bg="primary.400" textColor="black">
        <Tr>
          {headers.map((header) => (
            <Td key={header.name} width={header.width}>
              <Text noOfLines={1}> {header.name} </Text>
            </Td>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data &&
          data[k] &&
          data[k].map((row, idx) => (
            <StatsRow
              idx={idx + 1}
              id={row.id}
              key={row.name}
              name={row.name}
              course={row["courseByCourse"]["name"]}
              university={
                row["courseByCourse"]["universityByUniversity"]["name"]
              }
            />
          ))}
      </Tbody>
    </Table>
  );
};

const StatsRow = ({ idx, id, name, course, university }) => {
  return (
    <Tr
      textColor="primary.600"
      _hover={{
        cursor: "pointer",
        bg: "primary.200",
      }}
      onClick={() => {
        window.location = "/file/" + id;
      }}
    >
      <Td>
        <Text fontSize="lg">{idx}</Text>
      </Td>
      <Td>
        <Text fontSize="lg">{name}</Text>
      </Td>
      <Td>
        <Text fontSize="lg">{course}</Text>
      </Td>
      <Td>
        <Text fontSize="lg">{university}</Text>
      </Td>
    </Tr>
  );
};

const TableRow = ({ id, name, course, university }) => {
  return (
    <>
      <Card
        label={id}
        item={name}
        university={university}
        value={course}
      ></Card>
    </>
  );
};

export default MyLibrary;
