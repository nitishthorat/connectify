import React, { useState } from "react";
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
  MenuDivider,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "../../Miscellaneous/ProfileModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const SearchBox = () => {
  // const [search, setSearch] = useState("");
  // const [searchResult, setSearchResult] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [loadingChat, setLoadingChat] = useState(false);

  const { user } = ChatState();
  const history = useHistory();

  const onSearch = () => {};

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
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
      <InputGroup size="md" width="50%">
        <Input pr="4.5rem" type="text" placeholder="Search Chats" />
        <InputRightElement width="4.5rem">
          <Button mr="8px" h="1.75rem" size="sm" onClick={onSearch}>
            Search
          </Button>
        </InputRightElement>
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
