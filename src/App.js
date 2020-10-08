import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Navigation/AppBar";
import "./App.css";
import Routes from "./components/Routes/routes";

const App = () => {
  return (
    <Router>
      <Dashboard>
        <Routes />
      </Dashboard>
    </Router>
  );
};
export default App;
