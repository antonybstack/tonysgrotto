import React from "react";
import { useContext, useState } from "react";
import { TicketContext } from "../contexts/TicketContext";
import axios from "axios";
//props takes in data from Link, includes data like location /create
const AddBacklog = (props) => {
  const [tickets, setTickets] = useContext(TicketContext);

  const [name, setName] = useState("");

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
    console.log("this is testing tickets in addbacklog", tickets);
    axios.post("http://localhost:8080/tickets/add", newTicket).then((res) => {
      setTickets((currentTickets) => [...currentTickets, { _id: res.data.ticket._id, ticket_name: name, ticket_status: "backlog" }]);
    });

    //setTickets((currentTickets) => [...currentTickets, { _id: uuid(), ticket_name: name, ticket_status: "backlog" }]);

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
