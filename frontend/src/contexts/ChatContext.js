import React, { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

//Context provides a way to pass data through the component tree without having to pass props down manually at every level.

// createContext function returns a Provider and a Consumer component (i.e. TicketContext.Provider & TicketContext.Consumer)
export const ChatContext = createContext(); //creating Context object with empty object

export default ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [data, setData] = useState([]);
  const [chatLoaded, setChatLoaded] = useState(false);
  useEffect(() => {
    const getData = async () => {
      if (isAuthenticated) {
        console.log("getData was run!");
        setChats([]);
        axios.get("/api/chats").then((res) => {
          let temp = res.data;
          console.log(temp);
          temp.map((currentData, i) => {
            console.log(temp.timestamp);

            setChats((currentChats) => [...currentChats, currentData]);
          });
        });
      }
    };

    //window.location.hostname is for heroku deploy

    //uses promise so that connectSocket runs after getData is complete

    const checkLoad = async () => {
      const result = await getData();
      setTimeout(() => {
        setChatLoaded(true);
      }, 100);
      console.log(chats);
      //   setChatLoaded(true);
    };
    //rerenders when user logs in and user updates so that it notifies that the user has joined the chatroom
    checkLoad();
  }, [isAuthenticated]);
  console.log(chats);

  // provider passes context to all children compoents, no matter how deep it is
  return (
    <div>{!chatLoaded ? <img className="loading" src={require("../assets/loading.gif")} alt="loading..." /> : <ChatContext.Provider value={{ chats, setChats }}>{children}</ChatContext.Provider>}</div>
  );
  //   return (
  //     <div>
  //       <ChatContext.Provider value={{ chats }}>{children}</ChatContext.Provider>}
  //     </div>
  //   );
};
