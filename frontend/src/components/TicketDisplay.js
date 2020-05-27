import React from "react";
import { useContext } from "react";
import Ticket from "./Ticket";
import { TicketContext } from "../contexts/TicketContext";

//this component is subscribed to context changes
const TicketDisplay = () => {
  const { tickets } = useContext(TicketContext);

  //displays the data from TicketContext
  return (
    // react fragment so that div(13 to 16) and div(17 to 46) dont need to be wrapped in an extra div
    <React.Fragment>
      <div>
        <p>Number of Tickets: {tickets.length}</p>
      </div>
      <div className="display">
        <div className="backlog">
          <h1>Backlog</h1>
          <span className="nameheader">NAME</span>
          <table>
            <tbody>{tickets.map((currentTicket, i) => currentTicket.ticket_status === "backlog" && <Ticket ticket={currentTicket} key={i} />)}</tbody>
          </table>
        </div>
        <div className="sprint">
          <h1>Sprint</h1>
          <span className="nameheader">NAME</span>
          <table>
            <tbody>{tickets.map((currentTicket, i) => currentTicket.ticket_status === "sprint" && <Ticket ticket={currentTicket} key={i} />)}</tbody>
          </table>
        </div>
        <div className="progress">
          <h1>Progress</h1>
          <span className="nameheader">NAME</span>
          <table>
            <tbody>{tickets.map((currentTicket, i) => currentTicket.ticket_status === "progress" && <Ticket ticket={currentTicket} key={i} />)}</tbody>
          </table>
        </div>
        <div className="done">
          <h1>Done</h1>
          <span className="nameheader">NAME</span>
          <table>
            <tbody>{tickets.map((currentTicket, i) => currentTicket.ticket_status === "done" && <Ticket ticket={currentTicket} key={i} />)}</tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TicketDisplay;
