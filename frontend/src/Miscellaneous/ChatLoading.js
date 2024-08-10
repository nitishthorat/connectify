import { Spinner, Box } from "@chakra-ui/react";
import React from "react";

const ChatLoading = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Spinner size="xl" />
    </Box>
  );
};

export default ChatLoading;
