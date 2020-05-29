import React, { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

// Context provides a way to pass data through the component tree without having to pass props down manually at every level.

// createContext function returns a Provider and a Consumer component (i.e. TicketContext.Provider & TicketContext.Consumer)
export const ChatContext = createContext(); //creating Context object with empty object

export default ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [chatLoaded, setChatLoaded] = useState(false);
  useEffect(() => {
    const getChats = async () => {
      if (isAuthenticated) {
        setChats([]);
        await axios.get("/api/chats").then((res) => {
          let temp = res.data;
          temp.forEach((currentData) => {
            setChats((currentChats) => [...currentChats, currentData]);
          });
        });
      }
    };

    const load = async () => {
      await getChats();
      setChatLoaded(true);
    };

    load();

    //rerenders when user logs in and user updates so that it notifies that the user has joined the chatroom
  }, [isAuthenticated]);

  // provider passes context to all children compoents, no matter how deep it is
  return (
    <>
      {!chatLoaded ? (
        <>
          {console.log("chat not loaded")}
          <img className="loading" src={require("../assets/loading.gif")} alt="loading..." />
        </>
      ) : (
        <>
          {console.log("chat loaded")}
          <ChatContext.Provider value={{ chats, setChats }}>{children}</ChatContext.Provider>
        </>
      )}
    </>
  );
};
