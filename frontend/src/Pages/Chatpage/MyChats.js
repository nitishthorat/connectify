import React, { useContext, useEffect } from "react";
import { ChatContext } from "../../Context/ChatProvider";
import ChatLoading from "../../Miscellaneous/ChatLoading";
import UserListItem from "./UserListItem";
import { Box, Stack, Text } from "@chakra-ui/react";
import { getSender } from "../../Miscellaneous/ChatLogics";
import { UserContext } from "../../Context/UserProvider";

const MyChats = () => {
  const { chatData, isLoading, accessChat, selectedChat, setSelectedChat } =
    useContext(ChatContext);
  const { user } = useContext(UserContext);

  return (
    <Box
      width="20%"
      display="flex"
      flexDir="column"
      p={3}
      bg="#F8F8F8"
      overflowY="hidden"
    >
      {isLoading ? (
        <ChatLoading />
      ) : (
        <Stack
          overflowY="scroll"
          spacing={4}
          width="100%"
          align="stretch"
          gap="0px"
        >
          {chatData?.map((chat) => (
            <Box
              onClick={() => setSelectedChat(chat)}
              cursor="pointer"
              bg={selectedChat === chat ? "38B2AC" : "E8E8E8"}
              color={selectedChat === chat ? "white" : "black"}
              borderRadius="lg"
              key={chat._id}
            >
              <UserListItem
                key={getSender(user, chat.users)._id}
                user={getSender(user, chat.users)}
                padding="0px"
              />
            </Box>
            // <UserListItem
            //   key={user._id}
            //   user={user}
            //   handleFunction={() => accessChat(user._id)}
            // />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default MyChats;
