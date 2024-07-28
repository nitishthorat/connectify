import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import SearchBox from "./SearchBox";

const Chatpage = () => {
  const user = ChatState();

  return (
    <Box w="100%">
      <SearchBox w="100%"></SearchBox>
    </Box>
  );
};

export default Chatpage;
