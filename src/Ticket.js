import React from "react";
import ModalEdit from "./ModalEdit";

const Ticket = (props) => {
  // console.log("test");
  // console.log("props", props);
  return (
    <tr className="ticketItem">
      <td className="edit-button-data">
        <ModalEdit ticket={props} />
      </td>
      <td className="status-data">{props.ticket.ticket_status}</td>
      <td className="name-data">{props.ticket.ticket_name}</td>
      <td className="name-data">{props.ticket._id}</td>
      {/* <td className="id-data">ID: {props.ticket._id}</td> */}
    </tr>
  );
};

export default Ticket;
