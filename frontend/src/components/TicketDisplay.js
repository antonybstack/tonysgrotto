import React from "react";
import { useContext } from "react";
import Ticket from "./Ticket";
import { TicketContext } from "../contexts/TicketContext";
import { Card, CardDeck, ListGroup } from "react-bootstrap";

//this component is subscribed to context changes
const TicketDisplay = () => {
  const { tickets } = useContext(TicketContext);

  const countTicket = (status) => {
    var count = 0;
    tickets.forEach((t, index) => {
      if (t.ticket_status === status) {
        count += 1;
      }
    });
    return count;
  };

  //displays the data from TicketContext
  return (
    // react fragment so that div(13 to 16) and div(17 to 46) dont need to be wrapped in an extra div
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
            {tickets.map((currentTicket, i) => currentTicket.ticket_status === "backlog" && <Ticket ticket={currentTicket} key={i} />)}
          </ListGroup>
        )}
      </Card>
      <Card bg="light" text="dark">
        <Card.Header as="h3">
          Sprint <span className="numberOfTickets">{countTicket("sprint")}</span>
        </Card.Header>
        {countTicket("sprint") === 0 ? (
          <ListGroup variant="flush">
            <div className="ticketItem none">
              <div className="ticketName none">Time to organize your next sprint!</div>
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
              <div className="ticketName none">You need to get to work turkey-head!</div>
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
  );
};

export default TicketDisplay;
