import { Box, Center, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import Profile from "../MemberCard";
const About = () => {
  const members = [
    {
      name: "سعد السيدأحمد",
      image: "saed.jpeg",
      role: "مؤسس الموقع",
      link: "https://linkedin.com/in/saadmtsa",
    },
    {
      name: "عمرو عمرو",
      image: "amro.jpg",
      role: "تطوير الموقع",
      link: "https://linkedin.com/in/amro-amro-07a57219b/",
    },
    {
      name: "جامعتي",
      image: "jam3ti.png",
      role: "شريك إعلامي",
      link: "https://play.google.com/store/apps/details?id=com.palestine.jam3atii&hl=ar&gl=US",
    },
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
        <Text textAlign={"center"}>
          هل تود التبليغ عن مشكلة في الموقع؟ تواصل معنا على saed@maktabti.xyz
        </Text>
      </Box>
      <Box
        fontSize="xl"
        fontWeight={500}
        _hover={{
          color: "red",
        }}
        _
      >
        <a href="https://github.com/saedx1/maktabti">
          <Text textAlign={"center"}>
            هل تود المشاركة في تطوير الموقع برمجياً؟ الكود كله متاح على Github
          </Text>
        </a>
      </Box>
      <Text fontSize="xl" fontWeight={800}></Text>
    </VStack>
  );
};

export default About;
