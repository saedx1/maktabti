import {
  Heading,
  Box,
  Center,
  Image,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

// export default function SocialProfileWithImage() {
//   return (
//     <Center py={6}>
//       <Box
//         maxW={"270px"}
//         w={"full"}
//         bg={useColorModeValue("white", "gray.800")}
//         boxShadow={"2xl"}
//         rounded={"md"}
//         overflow={"hidden"}
//       >
//         <Box width="20em" height="5em"></Box>
//         <Flex justify={"center"} mt={-12}>
//           <Avatar
//             size={"xl"}
//             src={
//               "https://media-exp1.licdn.com/dms/image/C4E03AQGEhYaC5ApMcw/profile-displayphoto-shrink_800_800/0/1570109354539?e=1622073600&v=beta&t=It20n6lfIQxb-K5kmecqnUVUm7xh7Icp_3Sy3kkmzwk"
//             }
//             alt={"Author"}
//             css={{
//               border: "2px solid white",
//             }}
//           />
//         </Flex>

//         <Box p={6}>
//           <Stack spacing={0} align={"center"} mb={5}>
//             <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
//               سعد السيدأحمد
//             </Heading>
//             <Text color={"gray.500"}>مطوّر موقع مكتبتي</Text>
//           </Stack>

//           {/* ™<Button
//             w={"full"}
//             mt={8}
//             bg={useColorModeValue("#151f21", "gray.900")}
//             color={"white"}
//             rounded={"md"}
//             _hover={{
//               transform: "translateY(-2px)",
//               boxShadow: "lg",
//             }}
//           >
//             Follow
//           </Button> */}
//         </Box>
//       </Box>
//     </Center>
//   );
// }

export default function MemberCard({ image, name, role }) {
  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"300px"}
        w={"full"}
        bg={useColorModeValue("primary.white", "primary.800")}
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
            backgroundImage: `url(${image})`,
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
            width={250}
            objectFit={"cover"}
            src={image}
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {name}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={800} fontSize={"xl"}>
              {role}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
