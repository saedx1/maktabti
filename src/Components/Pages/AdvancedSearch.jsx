import {
  Box,
  Center,
  Select,
  FormLabel,
  Button,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

const AdvancedSearch = () => {
  return (
    <>
      <Center bg="primary.100" pt={10}>
        <SimpleGrid>
          <SimpleGrid columns={[1, 1, 2, 5]} gap={2}>
            <Box margin="auto" width="100%">
              <FormLabel fontSize="xl">الجامعة</FormLabel>
              <Select bg="white" fontSize="xl">
                <option>جامعة بوليتكنيك فلسطين</option>
                <option>جامعة بوليتكنيك فلسطين</option>
                <option>جامعة بوليتكنيك فلسطين</option>
              </Select>
            </Box>
            <Box margin="auto" width="100%">
              <FormLabel fontSize="xl">الكلية</FormLabel>
              <Select bg="white" fontSize="xl">
                <option>كلية الهندسة</option>
                <option>كلية الهندسة</option>
                <option>كلية الهندسة</option>
              </Select>
            </Box>
            <Box margin="auto" width="100%">
              <FormLabel fontSize="xl"> التخصص</FormLabel>
              <Select bg="white" fontSize="xl">
                <option>هندسة أنظمة الحاسوب</option>
                <option>هندسة أنظمة الحاسوب</option>
                <option>هندسة أنظمة الحاسوب</option>
              </Select>
            </Box>
            <Box margin="auto" width="100%">
              <FormLabel fontSize="xl">المساق</FormLabel>
              <Select bg="white" fontSize="xl">
                <option>فيزياء ١</option>
                <option>تفاضل وتكامل</option>
                <option>تفاضل وتكامل</option>
              </Select>
            </Box>
            <Box margin="auto" width="100%">
              <FormLabel fontSize="xl">النوع</FormLabel>
              <Select bg="white" fontSize="xl">
                <option>امتحان</option>
                <option>كتاب</option>
                <option>تلخيص</option>
              </Select>
            </Box>
          </SimpleGrid>
          <Center pt={5}>
            <Button
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
        <ResultRow {...data} pb={1} pt={1}></ResultRow>
        <ResultRow {...data} pb={1} pt={1} bg="primary.100"></ResultRow>
        <ResultRow {...data} pb={1} pt={1}></ResultRow>
        <ResultRow {...data} pb={1} pt={1} bg="primary.100"></ResultRow>
        <ResultRow {...data} pb={1} pt={1}></ResultRow>
        <ResultRow {...data} pb={1} pt={1} bg="primary.100"></ResultRow>
        <ResultRow {...data} pb={1} pt={1}></ResultRow>
        <ResultRow {...data} pb={1} pt={1} bg="primary.100"></ResultRow>
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
