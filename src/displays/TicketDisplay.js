import React from "react";
import { useState, useEffect, useContext } from "react";
import Ticket from "../Ticket";
import { TicketContext } from "../contexts/TicketContext";
import { Table } from "react-bootstrap";

import AddBacklog from "../addData/AddBacklog";

const TicketDisplay = (props) => {
  const [tickets, setTickets] = useContext(TicketContext);

  return (
    <div className="display">
      <p>Antony Blyakher</p>
      <p>Number of Tickets: {tickets.length}</p>
      <div className="backlog">
        <h1>Backlog</h1>
        <th className="onehead"></th>
        <th className="twohead">STATUS</th>
        <th className="threehead">NAME</th>
        <table>
          <tbody>
            {tickets.map((currentTicket, i) => (
              <Ticket ticket={currentTicket} key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  // <div className="display">
  //   <div className="backlog">
  //     <h1>Backlog</h1>
  //     {tickets.map((ticket, index) => (
  //       <div key={ticket.id}>
  //         {ticket.status === "backlog" && (
  //           <div className="ticketBlock">
  //             <button
  //               onClick={(e) => {
  //                 const newTickets = tickets.slice();
  //                 newTickets.splice(index, 1, {
  //                   ...ticket,
  //                   status: "sprint",
  //                 });
  //                 setTickets(newTickets);
  //               }}
  //             >
  //               push
  //             </button>
  //             &nbsp;
  //             <Ticket name={ticket.name} status={ticket.status} key={ticket.id} />
  //           </div>
  //         )}
  //       </div>
  //     ))}
  //   </div>

  //   <div className="sprint">
  //     <h1>Sprint</h1>
  //     <div>
  //       {tickets.map((ticket, index) => (
  //         <div key={ticket.id}>
  //           {ticket.status === "sprint" && (
  //             <div className="ticketBlock">
  //               <button
  //                 onClick={(e) => {
  //                   const newTickets = tickets.slice();
  //                   newTickets.splice(index, 1, {
  //                     ...ticket,
  //                     status: "progress",
  //                   });
  //                   setTickets(newTickets);
  //                 }}
  //               >
  //                 push
  //               </button>
  //               &nbsp;
  //               <Ticket name={ticket.name} status={ticket.status} key={ticket.id} />
  //             </div>
  //           )}
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  //   <div className="progress">
  //     <h1>Progress</h1>
  //     <div>
  //       {tickets.map((ticket, index) => (
  //         <div key={ticket.id}>
  //           {ticket.status === "progress" && (
  //             <div className="ticketBlock">
  //               <button
  //                 onClick={(e) => {
  //                   const newTickets = tickets.slice();
  //                   newTickets.splice(index, 1, {
  //                     ...ticket,
  //                     status: "done",
  //                   });
  //                   setTickets(newTickets);
  //                 }}
  //               >
  //                 push
  //               </button>
  //               &nbsp;
  //               <Ticket name={ticket.name} status={ticket.status} key={ticket.id} />
  //             </div>
  //           )}
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  //   <div className="done">
  //     <h1>Done</h1>
  //     <div>
  //       {tickets.map((ticket, index) => (
  //         <div key={ticket.id}>
  //           {ticket.status === "done" && (
  //             <div className="ticketBlock">
  //               <button
  //                 onClick={(e) => {
  //                   const newTickets = tickets.slice();
  //                   newTickets.splice(index, 1, {
  //                     ...ticket,
  //                     status: "backlog",
  //                   });
  //                   setTickets(newTickets);
  //                 }}
  //               >
  //                 push
  //               </button>
  //               &nbsp;
  //               <Ticket name={ticket.name} status={ticket.status} key={ticket.id} />
  //             </div>
  //           )}
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // </div>
};

export default TicketDisplay;
