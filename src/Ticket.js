import React from "react";
import { Link } from "react-router-dom";

const Ticket = (props) => {
  return (
    <div>
      {props.ticket.ticket_name && (
        <div>
          Name: {props.ticket.ticket_name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Status: {props.ticket.ticket_status}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ID: {props.ticket._id}
          <Link to={"/edit/" + props.ticket._id}>Edit</Link>
        </div>
      )}
    </div>
  );
};

export default Ticket;
