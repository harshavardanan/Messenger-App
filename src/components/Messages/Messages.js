import React from "react";
import Message from "../Message/Message";
import "./Messages.css";
// import ScrollToBottom from "react-scroll-to-bottom";
import ScrollableFeed from "react-scrollable-feed";

const Messages = ({ messages, name }) => {
  return (
    <div className="pageStyle" id="msg-container">
      <ScrollableFeed>
        {messages.map((message, index) => (
          <div key={index}>
            <Message message={message} name={name} />
          </div>
        ))}
      </ScrollableFeed>
    </div>
  );
};
export default Messages;
