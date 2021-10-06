import "./App.css";
import TokenTransfer from "./components/TokenTransfer";
import "./custom.scss";
import React from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Add the address and amount of tokens you want to add</p>
      </header>
      <TokenTransfer />
    </div>
  );
}

export default App;
