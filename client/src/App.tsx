import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Hi There</h2>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and reload.
      </p>
      {/* Sometimes we want a working relative path to
      server localhost:5000... */}
      <a href="/auth/google">Sign in With Google</a>
    </div>
  );
}

export default App;
