import React from "react";
import { useContext, useState } from "react";
import { BacklogContext } from "../contexts/BacklogContext";

const AddBacklog = () => {
  const [tickets, setTickets] = useContext(BacklogContext);

  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
    console.log({ name });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTickets((currentTickets) => [...currentTickets, { name: name }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Add Ticket: <input type="text" name="name" value={name} onChange={handleChange} />
      </label>
      <input type="submit" name="Submit"></input>
    </form>
  );
};

export default AddBacklog;
