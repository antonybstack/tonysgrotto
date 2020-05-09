import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { TicketContext } from "../contexts/TicketContext";

const EditTicket = (props) => {
  const [tickets, setTickets] = useContext(TicketContext);
  const [ticket, setTicket] = useState("");
  const [name, setName] = useState(props.value.ticket.ticket.ticket_name);
  const [status, setStatus] = useState(props.value.ticket.ticket.ticket_status);
  const [validation, setValidation] = useState(""); //input validation message

  //gets ticket using ticket._id from database
  useEffect(() => {
    axios
      .get("api/tickets/" + props.value.ticket.ticket._id)
      .then((response) => {
        setTicket(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.value.ticket.ticket._id]);

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

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //checks if empty
    if (validate(name)) {
      //creates ticket object
      const newTicket = {
        ticket_name: name,
        ticket_status: status,
      };
      // HTTP POST method sends data with updated ticket to the server
      axios.post("api/tickets/update/" + ticket._id, newTicket).then((res) => {
        // iterates tickets array to find specific ticket to delete
        tickets.map((t, index) => {
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
      });
    }
  };

  return (
    <div className="editForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Change Name:</label>
        <input type="text" name="name" value={name} onChange={handleChangeName} />
        <p className="validation">{validation}</p>
        <label htmlFor="status">Change Status:</label>
        <select name="status" value={status} onChange={handleChangeStatus}>
          <option defaultValue="backlog">backlog</option>
          <option value="sprint">sprint</option>
          <option value="progress">progress</option>
          <option value="done">done</option>
        </select>

        <input type="submit" name="Submit" className="submit"></input>
      </form>
    </div>
  );
};
export default EditTicket;
