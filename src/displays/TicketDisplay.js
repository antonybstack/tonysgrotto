import React from "react";
import { useState, useEffect } from "react";
import Ticket from "../Ticket";
import axios from "axios";

const TicketDisplay = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/tickets/")
      .then((response) => {
        console.log(response.data);
        setTickets(response.data);
        // this.setState({ tickets: response.data });
        // setTickets((currentTickets) => [...currentTickets, { name: name, status: "backlog", id: uuid() }]);
        // const [tickets, setTickets] = useState(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // const ticketList = () => {
  //   return <div>{tickets.map((ticket, index) => ());}</div>
  // };

  const ticketList = () => {
    //state management w/ context
    return (
      <div>
        {tickets.map((currentTicket, i) => (
          <Ticket ticket={currentTicket} key={i} />
        ))}
      </div>
    );
  };

  return ticketList();
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
