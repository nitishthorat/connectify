import { createContext, useEffect, useState } from "react";
import { UserContext, UserState } from "./UserProvider";
import axios from "axios";
import { useContext } from "react";

const authenticatedAxios = axios.create({
  baseURL: "/api/", // Replace with your API base URL
});

const setBaseURL = (url) => {
  authenticatedAxios.defaults.baseURL = url;
};

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
  const [chatData, setChatData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [selectedChat, setSelectedChat] = useState();
  const { user } = UserState();

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      setBaseURL("/api/chat");

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

      setIsLoading(true);
      const { data } = await axios.get(`/api/chat`, config);
      setChatData(data);
      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
