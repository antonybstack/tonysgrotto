import React from "react";
import { useContext, useState } from "react";
import { TicketContext } from "../contexts/TicketContext";
import uuid from "uuid/v1";
import axios from "axios";
//props takes in data from Link, includes data like location /create
const AddBacklog = (props) => {
  const [tickets, setTickets] = useState("");

  const [name, setName] = useState("");

  console.log("test", props);

  const handleChange = (e) => {
    setName(e.target.value);
    console.log({ name });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTicket = {
      ticket_name: name,
      ticket_status: "backlog",
    };

    axios.post("http://localhost:4000/tickets/add", newTicket).then((res) => console.log(res.data));

    setTickets((currentTickets) => [...currentTickets, { name: name, status: "backlog", id: uuid() }]);

    setName("");
    // props.history.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="addTicket">
        <label>
          <p>Add Ticket:</p>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </label>
        <input type="submit" name="Submit" className="submit"></input>
      </div>
    </form>
  );
};

export default AddBacklog;
