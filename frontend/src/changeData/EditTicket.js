import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { TicketContext } from "../contexts/TicketContext";

const EditTicket = (props) => {
  console.log("EditTicket mounted");
  const [tickets, setTickets] = useContext(TicketContext);
  const [ticket, setTicket] = useState("");
  const [name, setName] = useState(props.value.ticket.ticket.ticket_name);
  const [status, setStatus] = useState("backlog");
  const [validation, setValidation] = useState("");
  console.log(props);
  console.log(tickets);
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
    console.log({ name });
  };
  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
    console.log({ status });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(name)) {
      const newTicket = {
        ticket_name: name,
        ticket_status: status,
      };
      axios.post("api/tickets/update/" + ticket._id, newTicket).then((res) => {
        console.log(ticket._id);
        console.log(res.data);
        tickets.map((t, index) => {
          if (t._id === ticket._id) {
            const i = index;
            console.log(i);
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
        // tickets.map((ticket, index) => {
        //   const i = index;
        //   const newTickets = tickets.slice();
        //   newTickets.splice(index, 1, {
        //     ...ticket, //remove 1 element before 'index' and insert the following)
        //     ticket_name: res.data.ticket.ticket_name,
        //     ticket_status: res.data.ticket.ticket_status,
        //   });
        //   console.log(newTickets);
        //   setTickets(newTickets);
        // });
      });

      setName(""); //empties textbox
      setStatus(""); //empties textbox
    }
  };

  return (
    <div className="editForm">
      <form onSubmit={handleSubmit}>
        <label for="name">Change Name:</label>
        <input type="text" name="name" value={name} onChange={handleChangeName} />
        <p className="validation">{validation}</p>
        <label for="status">Change Status:</label>
        <select name="status" value={status} onChange={handleChangeStatus}>
          <option selected value="backlog">
            backlog
          </option>
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
