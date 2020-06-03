import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { TicketContext } from "../contexts/TicketContext";
import { AuthContext } from "../contexts/AuthContext";
import { SocketContext } from "../contexts/SocketContext";
import Message from "../components/Message";
import axios from "axios";
import { Form, Overlay, Tooltip } from "react-bootstrap";

//props takes in data from Link, includes data like location /create
const AddTicket = () => {
  //state that is able to update context
  const { setTickets } = useContext(TicketContext);
  const { user, isAuthenticated } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);
  const { socket } = useContext(SocketContext);
  const [show, setShow] = useState(false);
  const target = useRef(null);

  console.log("AddTicket");

  useEffect(() => {
    setMessage(null);
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name !== "") {
      setShow(false);
    }

    //creates ticket object
    const newTicket = {
      ticket_name: name,
      ticket_status: "backlog",
      created_by: user,
    };
    // HTTP POST method sends data to the server
    axios
      .post("api/tickets/add", newTicket)
      .then((res) => {
        console.log(res);
        // setShow(false);
        setMessage(null);
        setTickets((currentTickets) => [...currentTickets, { _id: res.data.ticket._id, ticket_name: name, ticket_status: "backlog", created_by: user._id }]); //push ticket object to state array
        // if (message) setShow(!show);
      })
      .catch(function (error) {
        console.log(error);
        setMessage(error.response.data.message);
        setShow(!show);
      });

    setName(""); //resets name input field
  };

  const authOpen = () => {
    return (
      <div className="addTicket">
        <Form inline onSubmit={handleSubmit}>
          <div className="addTicketForm">
            <input ref={target} className="ticketInput" id="ticket" type="text" value={name} onChange={handleChange} placeholder="e.g. deploy react app" autocomplete="off" />
            <button className="ticketSubmit" type="submit">
              Add Ticket
            </button>
          </div>
        </Form>
        <Overlay delay={{ show: 50, hide: 50 }} target={target.current} show={show} placement="bottom">
          {(props) => (
            <Tooltip id="errorMessage" {...props}>
              <Message message={message} />
            </Tooltip>
          )}
        </Overlay>

        {/* {message ? <Message message={message} /> : null} */}
      </div>
    );
  };

  const notAuthOpen = () => {
    return (
      <div className="addTicket">
        <Form inline onSubmit={handleSubmit} className="addTicketForm">
          <div className="addTicketForm">
            <input disabled className="ticketInput" id="ticket" type="text" value={name} onChange={handleChange} placeholder="e.g. deploy react app" />
            <button disabled className="ticketSubmit" type="submit">
              Add Ticket
            </button>
          </div>
        </Form>
      </div>
      // <React.Fragment>
      //     <form onSubmit={handleSubmit}>
      //       <div className="addTicket">
      //         <label>
      //           <p>Add Ticket:</p>
      //           <input type="text" name="name" value={name} onChange={handleChange} />
      //         </label>
      //         <input type="submit" name="Submit" className="submit"></input>
      //       </div>
      //     </form>
      //   )}
      //   {message ? <Message message={message} /> : null}
      // </React.Fragment>
    );
  };

  return (
    <>
      {isAuthenticated && authOpen()}
      {/* {isAuthenticated === false && <Message message={message} />} */}
      {!isAuthenticated && notAuthOpen()}
      {/* <div className="validation">{validation}</div> */}
    </>
  );
};

export default AddTicket;
