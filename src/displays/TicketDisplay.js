import React from "react";
import { useState, useEffect } from "react";
import Ticket from "../Ticket";
import axios from "axios";
import AddBacklog from "../addData/AddBacklog";

const TicketDisplay = (props) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      getTickets();
      console.log("ttt", tickets.length);
    }, 500);
    getTickets();
    console.log("ttt", tickets.length);
  }, []);

  const getTickets = async () => {
    const response = await axios.get("http://localhost:4000/tickets/");
    setTickets(response.data);
  };

  return (
    <div className="display">
      <div className="backlog">
        <h1>Backlog</h1>
        {tickets.map((currentTicket, i) => (
          <div className="ticketBlock">
            <Ticket ticket={currentTicket} key={i} />
          </div>
        ))}
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
