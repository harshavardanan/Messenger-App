import React, { useState, useEffect } from "react";
import socketClient from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { Image, Form, Button, Card } from "react-bootstrap";
import "./GlobalChat.css";
import ReactEmoji from "react-emoji";
import ScrollableFeed from "react-scrollable-feed";
import { auth } from "../../firebase";
import { useHistory, Link } from "react-router-dom";
import badWords from "bad-words-relaxed";
let socket;
const ENDPOINT = `https://hypnotize-global-server.herokuapp.com/`;

function GlobalChat() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(() => auth.currentUser);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState();
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");

  var filter = new badWords();
  const logOut = () => {
    auth.signOut();
    history.push("/");
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setName(user.displayName);
        setPhoto(user.photoURL);
      } else {
        setUser(false);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, [auth, initializing]);

  useEffect(() => {
    socket = socketClient(ENDPOINT);

    socket.on("connect", () => {
      console.log("Socket connected to the backend");
      socket.on("message", (message) => {
        receivedMessage(message);
      });
    });
  }, [ENDPOINT, user]);

  function receivedMessage(message) {
    setMessages((messages) => [...messages, message]);
  }
  const formSubmit = (event) => {
    event.preventDefault();
    const messageBody = {
      body: message,
      id: name,
      pic: photo,
    };
    setMessage("");
    socket.emit("send message", messageBody);
  };

  return (
    <>
      <div className="outerContainer">
        <div className="leftContainer">
          <Card className="join-card">
            <h5>Create Room</h5>
            <p>Welcome back, {name}.</p>
            <Form className="text-center">
              <div xs={6} md={4} style={{ marginTop: "10px" }}>
                <Image src={photo} roundedCircle />
              </div>

              <Card.Title>{name}</Card.Title>

              <input
                className="join-input"
                placeholder="Enter Room Name.."
                style={{ textTransform: "lowercase", textAlign: "center" }}
                onChange={(e) => setRoom(e.target.value)}
              />
              <Link
                to={`/chat?name=${name}&room=${room}`}
                onClick={(e) => (!name || !room ? e.preventDefault() : "null")}
              >
                <Button className="send-btn" type="submit">
                  Join
                </Button>
              </Link>
            </Form>

            <p>Not, {name}?</p>
            <Button className="logout-btn" onClick={logOut}>
              Sign Out
            </Button>
          </Card>
        </div>
        <div className="rightContainer">
          <h3>Chat with everyone!</h3>
          <div className="msg-container">
            <ScrollableFeed>
              {messages.map((message) => {
                if (message.id === name) {
                  return (
                    <div className="messageContainer justifyEnd">
                      <div className="sent-text pr-10" key={uuidv4()}>
                        <Image width="25px" src={message.pic} roundedCircle />
                        {message.id}
                        <div className="message-box backgroundBlue">
                          <p className="message-text colorWhite">
                            {ReactEmoji.emojify(filter.clean(message.body))}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="messageContainer justifyStart">
                      <div className="sent-text pl-10 " key={uuidv4()}>
                        <div className="message-box backgroundLight">
                          <p className="message-text colorDark">
                            {ReactEmoji.emojify(filter.clean(message.body))}
                          </p>
                        </div>
                        <Image width="25px" src={message.pic} roundedCircle />
                        {message.id}
                      </div>
                    </div>
                  );
                }
              })}
            </ScrollableFeed>
          </div>
          <form onSubmit={formSubmit} className="msg-form">
            <input
              placeholder="Type a message to send"
              className="msg-input"
              type="text"
              autoComplete="off"
              name="messageInput"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <Button
              className="msg-btn"
              type="submit"
              onClick={(e) => (!message ? e.preventDefault() : "null")}
            >
              SEND
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default GlobalChat;
