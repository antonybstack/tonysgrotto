import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { TicketContext } from "../contexts/TicketContext";

const DeleteTicket = (props) => {
  const [tickets, setTickets] = useContext(TicketContext);
  const [ticket, setTicket] = useState("");
  useEffect(() => {
    axios
      .get("api/tickets/" + props.value.ticket.ticket._id)
      .then((response) => {
        setTicket(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.delete("api/tickets/delete/" + ticket._id).then((res) => {
      tickets.map((t, index) => {
        if (t._id === ticket._id) {
          const i = index;
          console.log(i);
          const newTickets = tickets.slice();
          newTickets.splice(i, 1); //remove 1 element before 'index' (3rd parameter is empty because we dont want to insert anything)
          setTickets(newTickets);
        }
      });
    });

    // props.history.push("/");

    // setTickets((currentTickets) => [...currentTickets, { name: name, status: "backlog", id: uuid() }]);
  };

  return (
    <button className="deleteBtn" onClick={handleSubmit}>
      Delete Ticket
    </button>
  );
};
export default DeleteTicket;
