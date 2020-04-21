import React from "react";
import { useContext, useState } from "react";
import { TicketContext } from "../contexts/TicketContext";
import uuid from "uuid/v1";

const AddBacklog = () => {
  const [tickets, setTickets] = useContext(TicketContext);

  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
    console.log({ name });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTickets((currentTickets) => [...currentTickets, { name: name, status: "backlog", id: uuid() }]);
    setName(""); //empties textbox
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Add Ticket: <input type="text" name="name" value={name} onChange={handleChange} />
      </label>
      <input type="submit" name="Submit"></input>
    </form>
  );
};

export default AddBacklog;
