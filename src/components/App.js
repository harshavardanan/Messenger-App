import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login/Login";
import GlobalChat from "./Globalchat/GlobalChat";
import Chat from "./Chat/Chat";

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={GlobalChat} />
        <Route path="/chat" component={Chat} />
      </Router>
    </div>
  );
}

export default App;
