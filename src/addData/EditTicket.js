import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { TicketContext } from "../contexts/TicketContext";
import Ticket from "../Ticket";

const EditTicket = (props) => {
  const [tickets, setTickets] = useState(TicketContext);
  const [ticket, setTicket] = useState("");
  const [name, setName] = useState("");
  console.log(props);
  console.log(props.value.ticket.ticket._id);
  useEffect(() => {
    axios
      .get("http://localhost:4000/tickets/" + props.value.ticket.ticket._id)
      .then((response) => {
        setTicket(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
    console.log({ name });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ ticket });
    const newTicket = {
      ticket_name: name,
      ticket_status: "backlog",
    };
    axios.post("http://localhost:4000/tickets/update/" + ticket._id, newTicket).then((res) => console.log(res.data));

    // props.history.push("/");

    setTickets(TicketContext);
    setName(""); //empties textbox
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="editTicket">
        <label>
          <p>Change Name:</p>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </label>
        <input type="submit" name="Submit" className="submit"></input>
      </div>
    </form>
  );
};
export default EditTicket;
