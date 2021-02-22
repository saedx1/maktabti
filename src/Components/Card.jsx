// import { Box, Text, Button, Center } from "@chakra-ui/react";
// import { DownloadIcon } from "@chakra-ui/icons";
// export const Card = (props) => {
//   return (
//     <Box
//       bg="white"
//       borderWidth="1px"
//       borderRadius="xl"
//       borderColor="gray.400"
//     >
//       <Box borderRadius="xl" p={2}>
//         <Center fontSize="2xl" pb={5}>
//           {props.label}
//         </Center>

//         <Center>
//           <Text fontSize="xl">{props.item}</Text>
//         </Center>
//       </Box>
//       <Center bg="primary.300">
//         <Text fontSize="xl">{props.university}</Text>
//       </Center>
//       <Box
//         bg="primary.100"
//         pt={2}
//         p={2}
//         borderBottomRadius="xl"
//         textAlign="center"
//       >
// <Button
//   rightIcon={<DownloadIcon />}
//   bg="primary.300"
//   fontSize="xl"
//   fontWeight="normal"
// >
//   تنزيل
// </Button>
//       </Box>
//     </Box>
//   );
// };
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";

export const Card = (props) => {
  return (
    <Center py={6}>
      <Box
        maxW={"270px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {props.label}
            </Heading>
            <Text color={"gray.500"}>{props.university}</Text>
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{props.value}</Text>
              <Text fontSize="2xl" color={"gray.500"}>
                {props.item}
              </Text>
            </Stack>
          </Stack>

          <Button
            w={"full"}
            mt={8}
            color={"white"}
            rounded={"md"}
            rightIcon={<DownloadIcon />}
            bg="primary.300"
            fontSize="xl"
            fontWeight="normal"
          >
            تنزيل
          </Button>
        </Box>
      </Box>
    </Center>
  );
};
