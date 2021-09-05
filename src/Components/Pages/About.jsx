import { Box, Center, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import Profile from "../MemberCard";
const About = () => {
  const members = [
    {
      name: "سعد السيدأحمد",
      image:
        "https://media-exp1.licdn.com/dms/image/C4E03AQGEhYaC5ApMcw/profile-displayphoto-shrink_800_800/0/1570109354539?e=1635984000&v=beta&t=J4w48kg_AyN3681xRwJslCbtFhofsBUL9YnsrXt3p_4",
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
