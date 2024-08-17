import { createContext, useEffect, useState } from "react";
import { UserContext, UserState } from "./UserProvider";
import axios from "axios";
import { useContext } from "react";

const authenticatedAxios = axios.create({
  baseURL: "/api/chat/", // Replace with your API base URL
});

authenticatedAxios.interceptors.request.use(
  (request) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      request.headers.Authorization = `Bearer ${user.token}`;
    } else {
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const ChatContext = createContext(null);

const ChatProvider = ({ children }) => {
  const [chatData, setChatData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [selectedChat, setSelectedChat] = useState();
  const { user } = UserState();

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const { data } = await authenticatedAxios.post("/", { userId });
      setSelectedChat(data);
      setLoadingChat(false);
    } catch {}
  };

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      if (!chatData.length) {
        setIsLoading(true);
      }
      const { data } = await axios.get(`/api/chat`, config);
      setChatData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewChat = (chat) => {
    setChatData(chatData.push(chat));
  };

  useEffect(() => {
    console.log("Fetchchats");
    fetchChats();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        chatData,
        isLoading,
        accessChat,
        fetchChats,
        selectedChat,
        setSelectedChat,
        addNewChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
