import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { TicketContext } from "../contexts/TicketContext";

const EditTicket = (props) => {
  const [tickets, setTickets] = useContext(TicketContext);
  const [ticket, setTicket] = useState("");
  const [name, setName] = useState("");
  console.log(props);
  console.log(props.value.ticket.ticket._id);
  useEffect(() => {
    axios
      .get("http://localhost:4000/tickets/" + props.value.ticket.ticket._id)
      .then((response) => {
        setTicket(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
    console.log({ name });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ ticket });
    const newTicket = {
      ticket_name: name,
      ticket_status: "backlog",
    };
    console.log("this is testing tickets in editticket", tickets);
    axios.post("http://localhost:4000/tickets/update/" + ticket._id, newTicket).then((res) => {
      console.log(res.data);
      tickets.map((ticket, index) => {
        ticket._id === res.data.ticket._id && console.log("map", ticket, index);
        const i = index;
        const newTickets = tickets.slice();
        newTickets.splice(index, 1, {
          ...ticket, //remove 1 element before 'index' and insert the following)
          ticket_name: res.data.ticket.ticket_name,
        });
        console.log(newTickets);
        setTickets(newTickets);
      });
    });

    // axios.post("http://localhost:4000/tickets/update/" + ticket._id, newTicket).then((res) => {
    //   const newTickets = tickets.slice();
    // newTickets.splice(index, 1, {
    //   ...ticket,
    //   name: "sprint",
    // });
    //   setTickets(newTickets);
    // });
    // props.history.push("/");

    setName(""); //empties textbox
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="editTicket">
        <label>
          <p>Change Name:</p>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </label>
        <input type="submit" name="Submit" className="submit"></input>
      </div>
    </form>
  );
};
export default EditTicket;
