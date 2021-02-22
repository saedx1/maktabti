import { DownloadIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Circle,
  Grid,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

const MyLibrary = () => {
  const data = [
    "فيرست",
    "فيزياء 1",
    "هندسة حاسوب",
    "جامعة بوليتكنيك فلسطين",
    "سعد السيدأحمد",
  ];
  return (
    <>
      <Stack bg="primary.100" fontSize="2xl" pt={5}>
        <Center bg="primary.200">مكتبتك الخاصة</Center>
        <Center>
          <SimpleGrid columns={6} bg="primary.200" width="70%" rowGap={2}>
            <TableRow></TableRow>
            <TableRow bg="primary.100" download data={data}></TableRow>
            <TableRow bg="primary.100" download data={data}></TableRow>
            <TableRow bg="primary.100" download data={data}></TableRow>
            <TableRow bg="primary.100" download data={data}></TableRow>
          </SimpleGrid>
        </Center>
      </Stack>
    </>
  );
};

const TableRow = (props) => {
  console.log(props.data);
  return (
    <>
      <Box bg={props.bg || "primary.300"} textAlign="center">
        <Text noOfLines="1">{props.data ? props.data[0] : "اسم الملف"}</Text>
      </Box>
      <Box bg={props.bg || "primary.300"} textAlign="center">
        <Text noOfLines="1">{props.data ? props.data[1] : "المساق"}</Text>
      </Box>
      <Box bg={props.bg || "primary.300"} textAlign="center">
        <Text noOfLines="1">{props.data ? props.data[2] : "التخصص"}</Text>
      </Box>
      <Box bg={props.bg || "primary.300"} textAlign="center">
        <Text noOfLines="1">{props.data ? props.data[3] : "الجامعة"}</Text>
      </Box>
      <Box bg={props.bg || "primary.300"} textAlign="center">
        <Text noOfLines="1">{props.data ? props.data[4] : "بواسطة"}</Text>
      </Box>
      <Box bg={props.bg || "primary.300"} textAlign="center">
        {props.download && (
          <Button
            bg="transparent"
            leftIcon={<DownloadIcon />}
            variant="solid"
            fontSize="lg"
          >
            تنزيل
          </Button>
        )}
      </Box>
    </>
  );
};

export default MyLibrary;
