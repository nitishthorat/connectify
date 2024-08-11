import React, { useContext, useState } from "react";
import {
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  VStack,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { UserContext } from "../../Context/UserProvider";
import ProfileModal from "../../Miscellaneous/ProfileModal";
import { useNavigate } from "react-router-dom";
import UserListItem from "./UserListItem";
import { ChatContext } from "../../Context/ChatProvider";

const SearchBox = () => {
  const { user, searchUsersData, searchUsers } = useContext(UserContext);
  const { accessChat } = useContext(ChatContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const onSearch = (search) => {
    searchUsers(search);
    setShowDropdown(true);
  };

  const onItemClick = (userId) => {
    setShowDropdown(false);
    accessChat(userId);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      w="100%"
      p="5px 10px 5px 10px"
      height="75px"
    >
      <Text fontSize="2xl" fontFamily="Work sans">
        Connectify
      </Text>
      <InputGroup size="md" width="30%">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Search Users"
          onChange={(e) => onSearch(e.target.value)}
        />
        {showDropdown && (
          <InputRightElement width="4.5rem">
            <Button
              mr="8px"
              h="1.75rem"
              size="sm"
              onClick={() => {
                setShowDropdown(false);
              }}
            >
              Close
            </Button>
          </InputRightElement>
        )}
        {showDropdown && searchUsersData.length && (
          <VStack
            spacing={4}
            align="stretch"
            position="absolute"
            width="100%"
            top="46px"
            gap="0px"
            maxHeight="500px"
            overflowY="scroll"
            border="1px solid #E8E8E8"
            padding="5px"
            borderRadius="10px"
          >
            {searchUsersData.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => onItemClick(user._id)}
              />
            ))}
          </VStack>
        )}
        {showDropdown && !searchUsersData.length && (
          <Box
            position="absolute"
            width="100%"
            top="46px"
            gap="0px"
            border="1px solid #E8E8E8"
            padding="5px"
            borderRadius="10px"
          >
            No results found
          </Box>
        )}
      </InputGroup>

      <div>
        <Menu>
          <MenuButton p={1}>
            <BellIcon fontSize="2xl" m={1} />
          </MenuButton>
          <MenuList></MenuList>
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} p={1}>
            <Avatar name={user.name} size="sm" cursor="pointer" />
          </MenuButton>
          <MenuList>
            <ProfileModal user={user}>
              <MenuItem>My Profile</MenuItem>
            </ProfileModal>
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Box>
  );
};

export default SearchBox;
