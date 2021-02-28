import { Input, Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const SearchBox = (props) => {
  return (
    <Box textAlign="center" mt={5} mb={3} {...props}>
      <Input placeholder="بحث..." bg="white" w="50%" size="lg" me={2}></Input>
      <Button
        size="lg"
        rounded="md"
        color={["primary.500"]}
        bg={["primary.white"]}
        _hover={{
          bg: ["primary.100"],
        }}
        me={2}
        _focus={{
          outline: "none",
          border: "none",
        }}
      >
        انطلق
      </Button>
      <Link to="/advancedsearch">
        <Button
          size="lg"
          rounded="md"
          color={["primary.500"]}
          bg={["primary.white"]}
          _hover={{
            bg: ["primary.100"],
          }}
          _focus={{
            outline: "none",
            border: "none",
          }}
        >
          بحث متقدم
        </Button>
      </Link>
    </Box>
  );
};
