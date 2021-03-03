import { Box, SimpleGrid, Center } from "@chakra-ui/react";
import { Card } from "../Card";
const MyLibrary = () => {
  const data = ["فيزياء 1", "فيرست", "هندسة حاسوب", "جامعة بوليتكنيك فلسطين"];
  const card = <TableRow data={data}></TableRow>;
  return (
    <Center bg="primary.100" width="100%">
      <SimpleGrid p={10} bg="primary.100" columns={[1, 3, 5, 6]} gap={10}>
        <Box>{card}</Box>
        <Box>{card}</Box>
        <Box>{card}</Box>
        <Box>{card}</Box>
      </SimpleGrid>
    </Center>
  );
};

const TableRow = (props) => {
  console.log(props.data);
  return (
    <>
      <Card
        label={props.data[0]}
        item={props.data[1]}
        university={props.data[2]}
        value={props.data[3]}
      ></Card>
      {/* <Box bg={props.bg || "primary.300"} textAlign="center">
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
      </Box> */}
    </>
  );
};

export default MyLibrary;
