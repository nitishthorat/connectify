import React from "react";
import { Box } from "@chakra-ui/react";
import { UserState } from "../../Context/UserProvider";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";
import SearchBox from "./SearchBox";
import ChatProvider from "../../Context/ChatProvider";

const Chatpage = () => {
  const user = UserState();

  return (
    <Box w="100%">
      <ChatProvider>
        <SearchBox w="100%"></SearchBox>
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          height="91.5vh"
          padding="10px"
        >
          <MyChats></MyChats>
          <ChatBox></ChatBox>
        </Box>
      </ChatProvider>
    </Box>
  );
};

export default Chatpage;
