import React, { useContext } from "react";
import { Box, Text } from "@chakra-ui/react";
import { ChatContext } from "../../Context/ChatProvider";
import { getSender } from "../../Miscellaneous/ChatLogics";
import { UserContext } from "../../Context/UserProvider";
import SingleChat from "../../components/SingleChat";

const ChatBox = () => {
  const { selectedChat } = useContext(ChatContext);
  const { user } = useContext(UserContext);
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      width={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat />
      {/* {selectedChat && <Text>{getSender(user, selectedChat.users).name}</Text>} */}
    </Box>
  );
};

export default ChatBox;
