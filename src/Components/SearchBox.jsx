import { Input, Box, Button } from "@chakra-ui/react";

export const SearchBox = (props) => {
  return (
    <Box textAlign="center" mt={5} mb={3} {...props}>
      <Input placeholder="بحث..." bg="white" w="50%"></Input>
    </Box>
  );
};
