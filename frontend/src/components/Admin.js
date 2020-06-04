import React from "react";
import axios from "axios";
import moment from "moment-timezone";

const Admin = () => {
  const clearChats = async () => {
    var temp;
    const updateBeforeClear = async () => {
      await axios.get("/api/chats").then((res) => {
        temp = res.data;
      });
    };
    await updateBeforeClear();

    temp.forEach((t) => {
      axios.delete("api/chats/delete/" + t._id);
    });
  };
  return (
    <>
      <h1>Admin Page</h1>
      <button className="clearChatsDrag" onClick={clearChats}>
        clear chats
      </button>
    </>
  );
};

export default Admin;
