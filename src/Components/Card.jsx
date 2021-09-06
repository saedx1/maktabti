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
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { DownloadFile } from "./Pages/FileDetails";

export const Card = ({ isDownload, link, id, token, ...props }) => {
  return (
    <Center py={6}>
      <Box
        maxW={"270px"}
        w={"full"}
        bg={useColorModeValue("primary.white", "primary.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
        transition="all 300ms ease"
        _hover={{
          transform: "scale(1.2)",
        }}
      >
        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {props.label}
            </Heading>
            <Text color={"primary.500"}>{props.university}</Text>
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{props.value}</Text>
              <Text fontSize="2xl" color={"primary.500"}>
                {props.item}
              </Text>
              <Text fontSize="2xl" color={"primary.500"}>
                {props.otheritem}
              </Text>
            </Stack>
          </Stack>

          {isDownload && (
            <Button
              w={"full"}
              mt={8}
              color="primary.700"
              leftIcon={<DownloadIcon />}
              bg="primary.300"
              fontSize="xl"
              fontWeight="normal"
              rounded={"full"}
              onClick={() => {
                DownloadFile({ id, token, link });
              }}
            >
              تنزيل
            </Button>
          )}
        </Box>
      </Box>
    </Center>
  );
};
