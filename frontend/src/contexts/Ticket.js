import React from "react";
import ModalEdit from "../Modals/ModalEdit";

const Ticket = (props) => {
  console.log("Ticket object mounted");
  return (
    <tr className="ticketItem">
      <td className="edit-button-data">{props.ticket.ticket_name && <ModalEdit ticket={props} />}</td>
      <td className="status-data">{props.ticket.ticket_status}</td>
      <td className="name-data">{props.ticket.ticket_name}</td>
      <td className="name-data">{props.ticket._id}</td>
      {/* <td className="id-data">ID: {props.ticket._id}</td> */}
    </tr>
  );
};

export default Ticket;
