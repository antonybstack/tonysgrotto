import React from "react";
import "./App.css";
import { BacklogProvider } from "./contexts/BacklogContext";
import { SprintProvider } from "./contexts/SprintContext";
import { ProgressProvider } from "./contexts/ProgressContext";
import { DoneProvider } from "./contexts/DoneContext";
import BacklogDisplay from "./displays/BacklogDisplay";
import SprintDisplay from "./displays/SprintDisplay";
import ProgressDisplay from "./displays/ProgressDisplay";
import DoneDisplay from "./displays/DoneDisplay";
import AddBacklog from "./addData/AddBacklog";

function App() {
  return (
    <BacklogProvider>
      <SprintProvider>
        <ProgressProvider>
          <DoneProvider>
            <div className="App">
              <BacklogDisplay />
              <AddBacklog />
              <SprintDisplay />
              <ProgressDisplay />
              <DoneDisplay />
            </div>
          </DoneProvider>
        </ProgressProvider>
      </SprintProvider>
    </BacklogProvider>
  );
}

export default App;
