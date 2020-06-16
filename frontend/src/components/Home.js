import React from "react";
import TicketDisplay from "./TicketDisplay";
import Chat from "./Chat";
import UsersOnline from "./UsersOnline";
import AddTicket from "../changeData/AddTicket";

const Home = () => {
  return (
    <div className="home">
      <AddTicket />
      <TicketDisplay />
      <Chat />
      <UsersOnline />
    </div>
  );
};

export default Home;
