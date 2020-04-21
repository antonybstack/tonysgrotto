import React from "react";
import "./App.css";
import { TicketProvider } from "./contexts/TicketContext";
import TicketDisplay from "./displays/TicketDisplay";
import AddBacklog from "./addData/AddBacklog";

function App() {
  return (
    <TicketProvider>
      <div className="App">
        <AddBacklog />
        <TicketDisplay />
      </div>
    </TicketProvider>
  );
}

export default App;
