import { Box, Center, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import Profile from "../MemberCard";
const About = () => {
  const members = [
    {
      name: "سعد السيدأحمد",
      image: "%PUBLIC_URL%/saed.jpeg",
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
        <a href="mailto:saadmtsa@gmail.com">
          هل تود المشاركة في تطوير الموقع برمجياً؟ تواصل معنا
        </a>
      </Box>
      <Text fontSize="xl" fontWeight={800}></Text>
    </VStack>
  );
};

export default About;
