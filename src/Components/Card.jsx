import { Box, Text, Button, Center } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
export const Card = (props) => {
  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderRadius="xl"
      borderColor="gray.400"
    >
      <Box borderRadius="xl" p={2}>
        <Center fontSize="2xl" pb={5}>
          {props.label}
        </Center>

        <Center>
          <Text fontSize="xl">{props.item}</Text>
        </Center>
      </Box>
      <Center bg="primary.300">
        <Text fontSize="xl">{props.university}</Text>
      </Center>
      <Box
        bg="primary.100"
        pt={2}
        p={2}
        borderBottomRadius="xl"
        textAlign="center"
      >
        <Button
          rightIcon={<DownloadIcon />}
          bg="primary.300"
          fontSize="xl"
          fontWeight="normal"
        >
          تنزيل
        </Button>
      </Box>
    </Box>
  );
};
