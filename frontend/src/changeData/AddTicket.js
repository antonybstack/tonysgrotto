import React from "react";
import { useContext, useState, useEffect } from "react";
import { TicketContext } from "../contexts/TicketContext";
import { AuthContext } from "../contexts/AuthContext";
import { SocketContext } from "../contexts/SocketContext";
import Message from "../components/Message";
import axios from "axios";
//props takes in data from Link, includes data like location /create
const AddTicket = () => {
  //state that is able to update context
  const { setTickets } = useContext(TicketContext);
  const { user, isAuthenticated } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);
  const { socket } = useContext(SocketContext);

  console.log("AddTicket");

  useEffect(() => {
    setMessage(null);
  }, [socket]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //checks if empty
    if (true) {
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
          setMessage(null);
          setTickets((currentTickets) => [...currentTickets, { _id: res.data.ticket._id, ticket_name: name, ticket_status: "backlog", created_by: user._id }]); //push ticket object to state array
        })
        .catch(function (error) {
          setMessage(error.response.data.message);
        });
      setName(""); //resets name input field
    }
  };

  return (
    <React.Fragment>
      {isAuthenticated === true && (
        <form onSubmit={handleSubmit}>
          <div className="addTicket">
            <label>
              <p>Add Ticket:</p>
              <input type="text" name="name" value={name} onChange={handleChange} />
            </label>
            <input type="submit" name="Submit" className="submit"></input>
          </div>
        </form>
      )}
      {message ? <Message message={message} /> : null}
      {/* <div className="validation">{validation}</div> */}
    </React.Fragment>
  );
};

export default AddTicket;
