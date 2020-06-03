import React from "react";
import { useContext } from "react";
import Ticket from "./Ticket";
import { TicketContext } from "../contexts/TicketContext";
import { Card, CardDeck, ListGroup } from "react-bootstrap";
import Chat from "./Chat";

//this component is subscribed to context changes
const TicketDisplay = () => {
  const { tickets } = useContext(TicketContext);

  console.log("TicketDisplay");

  const countTicket = (status) => {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    var count = 0;
    tickets.forEach((t, index) => {
      console.log(t, status);
      if (t.ticket_status === status) {
        count += 1;
      }
      console.log(count);
    });
    return count;
  };

  //displays the data from TicketContext
  return (
    // react fragment so that div(13 to 16) and div(17 to 46) dont need to be wrapped in an extra div
    // <div className="container">
    <CardDeck className="cardDeck">
      <Card bg="light" text="dark">
        <Card.Header as="h3">
          Backlog <span className="numberOfTickets">{countTicket("backlog")}</span>
        </Card.Header>

        {countTicket("backlog") === 0 ? (
          <ListGroup variant="flush">
            <div className="ticketItem none">
              <div className="ticketName none">Time to brainstorm!</div>
            </div>
          </ListGroup>
        ) : (
          <ListGroup className="listItem" variant="flush">
            {tickets.map(
              (currentTicket, i) =>
                currentTicket.ticket_status === "backlog" && (
                  // <ListGroup.Item key={i}>
                  <Ticket ticket={currentTicket} key={i} />
                  /* </ListGroup.Item> */
                )
            )}
          </ListGroup>
        )}
        {/* <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer> */}
      </Card>
      <Card bg="light" text="dark">
        <Card.Header as="h3">
          Sprint <span className="numberOfTickets">{countTicket("sprint")}</span>
        </Card.Header>
        {/* <ListGroup variant="flush">{tickets.map((currentTicket, i) => currentTicket.ticket_status === "sprint" && <Ticket ticket={currentTicket} key={i} />)}</ListGroup> */}
        {countTicket("sprint") === 0 ? (
          <ListGroup variant="flush">
            <div className="ticketItem none">
              <div className="ticketName none">Time to setup for your next sprint!</div>
            </div>
          </ListGroup>
        ) : (
          <ListGroup variant="flush">{tickets.map((currentTicket, i) => currentTicket.ticket_status === "sprint" && <Ticket ticket={currentTicket} key={i} />)}</ListGroup>
        )}
      </Card>
      <Card bg="light" text="dark">
        <Card.Header as="h3">
          Progress <span className="numberOfTickets">{countTicket("progress")}</span>
        </Card.Header>

        {countTicket("progress") === 0 ? (
          <ListGroup variant="flush">
            <div className="ticketItem none">
              <div className="ticketName none">You need to get to work chicken-head!</div>
            </div>
          </ListGroup>
        ) : (
          <ListGroup variant="flush">{tickets.map((currentTicket, i) => currentTicket.ticket_status === "progress" && <Ticket ticket={currentTicket} key={i} />)}</ListGroup>
        )}
      </Card>
      <Card bg="light" text="dark">
        <Card.Header as="h3">
          Done <span className="numberOfTickets">{countTicket("done")}</span>
        </Card.Header>

        {countTicket("done") === 0 ? (
          <ListGroup variant="flush">
            <div className="ticketItem none">
              <div className="ticketName none">Try focusing on one bug or feature at a time!</div>
            </div>
          </ListGroup>
        ) : (
          <ListGroup variant="flush">{tickets.map((currentTicket, i) => currentTicket.ticket_status === "done" && <Ticket ticket={currentTicket} key={i} />)}</ListGroup>
        )}
      </Card>
    </CardDeck>
    // </div>
  );
};

export default TicketDisplay;
