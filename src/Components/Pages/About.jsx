import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  VStack,
  SimpleGrid,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Profile from "../MemberCard";
const About = () => {
  const members = [
    {
      name: "سعد السيدأحمد",
      image:
        "https://media-exp1.licdn.com/dms/image/C4E03AQGEhYaC5ApMcw/profile-displayphoto-shrink_800_800/0/1570109354539?e=1622073600&v=beta&t=It20n6lfIQxb-K5kmecqnUVUm7xh7Icp_3Sy3kkmzwk",
      role: "مطوّر موقع مكتبتي",
    },
    // {
    //   name: "أنس الدرابيع",
    //   image:
    //     "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/143668674_275554297330621_4601416955363045992_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=DPdYt-0bhawAX9j9k45&_nc_ht=scontent-atl3-1.xx&oh=91c6480bc11de7e6238cf64c2d0276e0&oe=60868687",
    //   role: "مطوّر موقع مكتبتي",
    // },
  ];
  return (
    <VStack>
      <Center bg="primary.100" p={5}>
        <Wrap>
          {members.map((x) => (
            <WrapItem>
              <Profile {...x} />
            </WrapItem>
          ))}
        </Wrap>
      </Center>
      <Box
        fontSize="xl"
        fontWeight={500}
        _hover={{
          color: "red",
        }}
      >
        <a href="mailto:saed@maktabti.xyz">
          هل تود المشاركة في تطوير الموقع برمجياً؟ تواصل معنا
        </a>
      </Box>
      <Text fontSize="xl" fontWeight={800}></Text>
    </VStack>
  );
};

export default About;
