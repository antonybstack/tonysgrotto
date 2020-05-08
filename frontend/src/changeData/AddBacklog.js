import React from "react";
import { useContext, useState } from "react";
import { TicketContext } from "../contexts/TicketContext";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
//props takes in data from Link, includes data like location /create
const AddBacklog = () => {
  console.log("AddBacklog mounted");
  //state that is able to update context
  const [tickets, setTickets] = useContext(TicketContext);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [validation, setValidation] = useState(""); //input validation message
  console.log("here", isAuthenticated);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  //checks if input field is empty
  const validate = (name) => {
    if (name === "") {
      setValidation("field cannot be empty");
      return false;
    } else {
      setValidation("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //checks if empty
    if (validate(name)) {
      //creates ticket object
      const newTicket = {
        ticket_name: name,
        ticket_status: "backlog",
      };
      // HTTP POST method sends data to the server
      axios.post("api/tickets/add", newTicket).then((res) => {
        setTickets((currentTickets) => [...currentTickets, { _id: res.data.ticket._id, ticket_name: name, ticket_status: "backlog" }]); //push ticket object to state array
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
      <div className="validation">{validation}</div>
    </React.Fragment>
  );
};

export default AddBacklog;
