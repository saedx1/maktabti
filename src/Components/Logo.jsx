import React from "react";
import { Box, Text } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <Box {...props}>
      <Text fontSize="2xl" fontWeight="bold" textColor="primary.light">
        مكتبتي
      </Text>
    </Box>
  );
}
