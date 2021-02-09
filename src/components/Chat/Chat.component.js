import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import * as qs from "query-string";

import PRESETS from "../../presets/index";
const ENDPOINT = "http://localhost:8080/";

const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};
let socket;

export const Chat = (...props) => {
  const [response, setResponse] = useState([]);
  const [currentMsg, setCurrentMsg] = useState("");
  const [myId, setmyId] = useState("");
  const { room, username } = qs.parse(props[0].location.search);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket = io(ENDPOINT, connectionOptions);
    socket.emit("joinRoom", { room, username });
    socket.on("msgFromServer", (data) => {
      setResponse((msgHistory) => [...msgHistory, data]);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    return () => socket.disconnect();
  }, []);

  const handleOnSend = (e) => {
    e.preventDefault();
    setmyId(socket.id);
    const message = { msg: e.target.elements.msg.value, username };
    socket.emit("msgFromUser", message);
    setCurrentMsg("");
  };

  const handleOnCurrentMsgChange = (e) => {
    setCurrentMsg(e.target.value);
  };

  const isPreset = (text) => !!PRESETS.includes(text);
  return (
    <>
      <div className="chat-container">
        <header className="chat-header">
          <a href="index.html" className="btn">
            Leave Room
          </a>
        </header>
        <main className="chat-main">
          <div className="chat-sidebar">
            <h3>
              <i className="fas fa-comments"></i> Room Name:
            </h3>
            <h2 id="room-name">{room}</h2>
            <h3>
              <i className="fas fa-users"></i> Users
            </h3>
            <ul id="users"></ul>
          </div>
          <div className="chat-messages">
            <ul>
              {response.map((data, i) => (
                <li
                  className={data.id === myId ? "li-left" : "li-right"}
                  key={i}
                >
                  {!!data.msg && (
                    <>
                      {!!data.username && (
                        <div className="from-user">{data.username}:</div>
                      )}
                      <p
                        className={
                          isPreset(data.msg) ? "secondaryText" : "primaryText"
                        }
                      >
                        {data.msg}
                      </p>
                    </>
                  )}
                  <br />
                </li>
              ))}
            </ul>
            <div ref={messagesEndRef} />
          </div>
        </main>
        <div className="chat-form-container">
          <form id="chat-form" onSubmit={handleOnSend}>
            <input
              id="msg"
              type="text"
              placeholder="Enter Message"
              value={currentMsg}
              onChange={handleOnCurrentMsgChange}
              required
              autocomplete="off"
            />
            <button className="btn" type="submit">
              <i className="fas fa-paper-plane"></i> Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
