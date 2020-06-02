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

  //displays the data from TicketContext
  return (
    // react fragment so that div(13 to 16) and div(17 to 46) dont need to be wrapped in an extra div
    // <div className="container">
    <CardDeck className="cardDeck">
      <Card bg="light" text="dark">
        <Card.Header as="h3">Backlog</Card.Header>
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
        {/* <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer> */}
      </Card>
      <Card bg="light" text="dark">
        <Card.Header as="h3">Sprint</Card.Header>
        <ListGroup variant="flush">{tickets.map((currentTicket, i) => currentTicket.ticket_status === "sprint" && <Ticket ticket={currentTicket} key={i} />)}</ListGroup>
        {/* <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer> */}
      </Card>
      <Card bg="light" text="dark">
        <Card.Header as="h3">Progress</Card.Header>
        <ListGroup variant="flush">{tickets.map((currentTicket, i) => currentTicket.ticket_status === "progress" && <Ticket ticket={currentTicket} key={i} />)}</ListGroup>
      </Card>
      <Card bg="light" text="dark">
        <Card.Header as="h3">Done</Card.Header>
        <ListGroup variant="flush">{tickets.map((currentTicket, i) => currentTicket.ticket_status === "done" && <Ticket ticket={currentTicket} key={i} />)}</ListGroup>
      </Card>
    </CardDeck>
    // </div>
  );
};

export default TicketDisplay;
