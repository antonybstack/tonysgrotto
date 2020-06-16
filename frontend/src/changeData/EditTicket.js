import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { TicketContext } from "../contexts/TicketContext";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";

const EditTicket = (props) => {
  const { tickets, setTickets } = useContext(TicketContext);
  const [ticket, setTicket] = useState("");
  const [name, setName] = useState(props.value.ticket.ticket.ticket_name);
  const [status, setStatus] = useState(props.value.ticket.ticket.ticket_status);
  const [message, setMessage] = useState(null);
  //gets ticket using ticket._id from database
  useEffect(() => {
    axios
      .get("api/tickets/" + props.value.ticket.ticket._id)
      .then((response) => {
        setTicket(response.data);
      })
      .catch(function (error) {});
  }, [props.value.ticket.ticket._id]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //checks if empty

    //creates ticket object
    const newTicket = {
      ticket_name: name,
      ticket_status: status,
    };
    // HTTP POST method sends data with updated ticket to the server
    axios
      .post("api/tickets/update/" + ticket._id, newTicket)
      .then((res) => {
        // iterates tickets array to find specific ticket to delete
        tickets.forEach((t, index) => {
          if (t._id === ticket._id) {
            const newTickets = tickets.slice();
            newTickets.splice(index, 1, {
              ...ticket, //remove 1 element before 'index' and insert the following)
              ticket_name: res.data.ticket.ticket_name,
              ticket_status: res.data.ticket.ticket_status,
            });
            setTickets(newTickets);
          }
          return null;
        });
        props.action();
      })
      .catch(function (error) {
        setMessage(error.response.data.message);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Change Name</Form.Label>
        <Form.Control type="text" value={name} onChange={handleChangeName} />
        {message ? <Message message={message} /> : null}
      </Form.Group>
      <Form.Group>
        <Form.Label>Change Status</Form.Label>
        <Form.Control as="select" name="status" value={status} onChange={handleChangeStatus}>
          <option defaultValue="backlog">backlog</option>
          <option value="sprint">sprint</option>
          <option value="progress">progress</option>
          <option value="done">done</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
export default EditTicket;
