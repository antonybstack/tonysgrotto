import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { TicketContext } from "../contexts/TicketContext";
import { Button } from "react-bootstrap";

const DeleteTicket = (props) => {
  //state that is able to update context
  const { tickets, setTickets } = useContext(TicketContext);
  const [ticket, setTicket] = useState("");

  console.log("DeleteTicket");
  //gets ticket using ticket._id from database
  useEffect(() => {
    const getTicket = async () => {
      await axios
        .get("api/tickets/" + props.value.ticket.ticket._id)
        .then((res) => {
          setTicket(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getTicket();
  }, [props.value.ticket.ticket._id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // HTTP DELETE method send request to the server
    axios.delete("api/tickets/delete/" + ticket._id).then((res) => {
      // iterates tickets array to find specific ticket to delete
      tickets.forEach((t, index) => {
        if (t._id === ticket._id) {
          const i = index;
          const newTickets = tickets.slice();
          newTickets.splice(i, 1); //remove 1 element before 'index' (3rd parameter is empty because we dont want to insert anything)
          setTickets(newTickets);
        }
      });
    });
    props.action();
  };

  return (
    // <button className="deleteBtn" onClick={handleSubmit}>
    //   Delete Ticket
    // </button>
    <Button variant="danger" onClick={handleSubmit}>
      Delete Ticket
    </Button>
  );
};
export default DeleteTicket;
