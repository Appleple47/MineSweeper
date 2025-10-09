import React from "react";
import { BoardComponent } from "./components/Board";

function App() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      paddingTop: "2rem",
      gap: "1rem"
    }}>
      <h1>Mine Sweeper ⛏️</h1>
      <BoardComponent />
    </div>
  );
}
export default App;