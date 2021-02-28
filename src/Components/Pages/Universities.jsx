import { Box, Grid, Center, GridItem, SimpleGrid } from "@chakra-ui/react";

import {
  Heading,
  Avatar,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

const University = () => {
  const universities = [
    "جامعة بوليتكنيك فلسطين",
    "جامعة بوليتكنيك فلسطين",
    "جامعة بيرزيت",
    "جامعة بيرزيت",
    "جامعة بيرزيت",
    "جامعة  النجاح",
    "جامعة  النجاح",
    "جامعة  النجاح",
  ];

  return (
    <SimpleGrid
      pt={6}
      columns={[1, 1, 2, 4]}
      // templateRows="repeat(4, 1fr)"
      // templateColumns="repeat(3, 1fr)"
      bg="primary.100"
    >
      {universities.map((i, idx) => {
        return <ProductSimple name={i}></ProductSimple>;
      })}
    </SimpleGrid>
  );
};

const Item = ({ name }) => {
  return (
    <Center
      rounded="lg"
      fontSize="2xl"
      bgGradient="linear(to-b, primary.300, primary.400)"
      width="10em"
      height="1.5em"
      shadow="lg"
      _hover={{
        fontSize: "2xl",
        width: "10.2em",
        height: "1.7em",
      }}
    >
      {name}
    </Center>
  );
};
export default University;

const IMAGE =
  "https://cdn4.khbrpress.ps/thumb/730x400/uploads/images/Bj0KI.jpg";

function ProductSimple({ name }) {
  return (
    <Center my={12} as="button" border="none" outline="none">
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={IMAGE}
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Text
            color={"gray.500"}
            fontSize={"sm"}
            textTransform={"uppercase"}
          ></Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {name}
          </Heading>
          <Stack direction={"row"} align={"center"}></Stack>
        </Stack>
      </Box>
    </Center>
  );
}
