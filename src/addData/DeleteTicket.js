import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const EditTicket = (props) => {
  const [ticket, setTicket] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ ticket });

    axios.delete("http://localhost:4000/tickets/delete/" + ticket._id).then((res) => console.log(res.data));

    // props.history.push("/");

    // setTickets((currentTickets) => [...currentTickets, { name: name, status: "backlog", id: uuid() }]);
  };

  return <button onClick={handleSubmit}>Delete Ticket</button>;
};
export default EditTicket;
