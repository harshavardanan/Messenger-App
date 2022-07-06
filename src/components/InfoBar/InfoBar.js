import React from "react";
import { Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./InfoBar.css";

export default function InfoBar({ room }) {
  // const history = useHistory();
  // function leaveRoom() {
  //   history.push("/home");
  // }
  return (
    <Container className="infobar-container">
      <div className="left-container">
        <h1 className="room-name">{room}</h1>
      </div>
      <div className="right-container">
        <a href="/home">
          <Button className="leave-btn">Leave Room</Button>
        </a>
      </div>
    </Container>
  );
}
