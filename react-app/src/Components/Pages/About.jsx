import { Box, Center, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import Profile from "../MemberCard";
const About = () => {
  const members = [
    {
      name: "سعد السيدأحمد",
      image: "saed.jpeg",
      role: "مطوّر موقع مكتبتي",
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
        <a href="mailto:saed@maktabti.xyz">
          <Text>هل تود التبليغ عن مشكلة في الموقع؟ إضغط هنا</Text>
        </a>
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
          <Text>هل تود المشاركة في تطوير الموقع برمجياً؟ تواصل معنا</Text>
        </a>
      </Box>
      <Text fontSize="xl" fontWeight={800}></Text>
    </VStack>
  );
};

export default About;
