import React from "react";
import ModalEdit from "../Modals/ModalEdit";
import Profile from "./Profile";

//this component's purpose is for cleaner code and is used in EditTicket. EditTicket takes data from TicketContext and passes that data to this component to output the html.
const Ticket = (props) => {
  let userID = props.ticket.created_by.toString();

  console.log("Ticket");

  return (
    <tr className="ticketItem">
      <td>{props.ticket.ticket_name && <ModalEdit ticket={props} />}</td>
      {/* <td>{props.ticket.ticket_status}</td> */}
      <td>{props.ticket.ticket_name}</td>
      {/* <td>{props.ticket._id}</td> */}
      <td>
        <Profile userID={userID} />
      </td>
    </tr>
  );
};

export default Ticket;
