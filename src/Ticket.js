import React from "react";
import { Link } from "react-router-dom";
import EditTicket from "./addData/EditTicket";
import ModalEdit from "./ModalEdit";

const Ticket = (props) => {
  console.log("test");
  return (
    <div>
      {props.ticket.ticket_name && (
        <div className="ticketItem">
          Name: {props.ticket.ticket_name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Status: {props.ticket.ticket_status}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ID: {props.ticket._id}
          <ModalEdit ticket={props} />
        </div>
      )}
    </div>
  );
};

export default Ticket;
