import {
  Center,
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Text,
  Th,
  Thead,
} from "@chakra-ui/react";
import useSWR from "swr";

const Stats = () => {
  const { data: data1 } = useSWR("/get_user_stats");
  const headers1 = [
    { name: "", width: "8%" },
    { name: "الاسم", width: "67%" },
    { name: "الملفات ", width: "25%" },
  ];

  const { data: data2 } = useSWR("/get_university_stats");
  const headers2 = [
    { name: "", width: "8%" },
    { name: "الجامعة", width: "67%" },
    { name: "الملفات ", width: "25%" },
  ];

  return (
    <>
      <Center fontSize="3xl" bg="primary.100" p={5}>
        عدد الملفات المرفوعة لكل عضو
      </Center>
      <Center>
        <Box width={["95%", "95%", "30%"]}>
          <StatsTable headers={headers1} data={data1} k={"top_users"} />
        </Box>
      </Center>
      <Center fontSize="3xl" bg="primary.100" p={5}>
        عدد الملفات المرفوعة لكل جامعة
      </Center>
      <Center>
        <Box width={["95%", "95%", "30%"]}>
          <StatsTable headers={headers2} data={data2} k={"top_universities"} />
        </Box>
      </Center>
    </>
  );
};

const StatsTable = ({ headers, data, k }) => {
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
              key={row.name}
              rank={idx + 1}
              name={row.name}
              count={row.count}
            />
          ))}
      </Tbody>
    </Table>
  );
};

const StatsRow = ({ rank, name, count }) => {
  return (
    <Tr textColor="primary.600">
      <Td>
        <Text fontSize="lg">{rank}</Text>
      </Td>
      <Td>
        <Text fontSize="lg">{name}</Text>
      </Td>
      <Td>
        <Text fontSize="lg">{count}</Text>
      </Td>
    </Tr>
  );
};

export default Stats;
