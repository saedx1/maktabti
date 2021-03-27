import { Input, Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const SearchBox = (props) => {
  return (
    <Box textAlign="center" mt={5} mb={3} {...props}>
      <Input
        placeholder="بحث..."
        bg="white"
        w="50%"
        size="lg"
        me={2}
        rounded={"full"}
        zIndex={3}
      ></Input>
      <Button
        size="lg"
        fontSize="xl"
        rounded="md"
        textColor="white"
        bg={["primary.700"]}
        _hover={{
          bg: ["primary.400"],
        }}
        me={3}
        ml="-4.5em"
        mb={0.5}
        _focus={{
          outline: "none",
          border: "none",
        }}
        rounded={"full"}
        zIndex={4}
      >
        انطلق
      </Button>
      <Link to="/advancedsearch">
        <Button
          size="lg"
          fontSize="xl"
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
          rounded={"full"}
        >
          بحث متقدم
        </Button>
      </Link>
    </Box>
  );
};
