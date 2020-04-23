import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const EditTicket = (props) => {
  const [ticket, setTicket] = useState("");
  const [name, setName] = useState("");
  console.log(ticket);
  console.log(ticket._id);
  useEffect(() => {
    axios
      .get("http://localhost:4000/tickets/" + props.match.params.id)
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

    axios.post("http://localhost:4000/tickets/update/" + ticket._id, newTicket).then((res) => console.log(res.data));

    props.history.push("/");

    // setTickets((currentTickets) => [...currentTickets, { name: name, status: "backlog", id: uuid() }]);
    setName(""); //empties textbox
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Ticket Name: <input type="text" name="name" value={name} onChange={handleChange} />
      </label>
      <input type="submit" name="Submit"></input>
    </form>
  );
};
export default EditTicket;
