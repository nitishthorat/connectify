import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const authenticatedAxios = axios.create({
  baseURL: "/api/", // Replace with your API base URL
});

authenticatedAxios.interceptors.request.use(
  (request) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      request.headers.Authorization = `Bearer ${user.token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [searchUsersData, setSearchUsersData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) {
      navigate("/");
    } else {
      navigate("/chats");
    }
  }, []);

  const searchUsers = async (search) => {
    try {
      const { data } = await authenticatedAxios.get(`user?search=${search}`);
      setSearchUsersData(data);
    } catch (error) {}
  };

  return (
    <UserContext.Provider value={{ user, searchUsersData, searchUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};

export default UserProvider;
