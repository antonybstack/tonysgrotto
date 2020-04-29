import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { TicketContext } from "../contexts/TicketContext";

const EditTicket = (props) => {
  const [tickets, setTickets] = useContext(TicketContext);
  const [ticket, setTicket] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ ticket });

    axios.delete("http://localhost:4000/tickets/delete/" + ticket._id).then((res) => {
      console.log(res.data);
      tickets.map((ticket, index) => {
        ticket._id === res.data.ticket._id && console.log("map", ticket, index);
        const i = index;
        const newTickets = tickets.slice();
        newTickets.splice(index, 1); //remove 1 element before 'index' (3rd parameter is empty because we dont want to insert anything)
        console.log(newTickets);
        setTickets(newTickets);
      });
    });

    // props.history.push("/");

    // setTickets((currentTickets) => [...currentTickets, { name: name, status: "backlog", id: uuid() }]);
  };

  return <button onClick={handleSubmit}>Delete Ticket</button>;
};
export default EditTicket;
