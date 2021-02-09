import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const Main = () => {
  let history = useHistory();
  const [userName, setUserName] = useState("");
  const [chatroom, setChatroom] = useState("JavaScript");

  const nextPath = (path) => {
    history.push({
      pathname: path,
      search: `?username=${userName}&room=${chatroom}`,
    });
  };

  const handleOnChange = (e) => {
    setUserName(e.target.value);
  };
  const handleOnSelect = (e) => {
    setChatroom(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextPath("/chat");
  };
  return (
    <>
      <div className="join-container">
        
        <main className="join-main">
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label for="username">Username</label>
              <input
                type="text"
                name="username"
                value={userName}
                onChange={handleOnChange}
                id="username"
                placeholder="Enter username..."
                required
              />
            </div>
            <div className="form-control">
              <label for="room">Room</label>
              <select
                name="room"
                id="room"
                value={chatroom}
                onChange={handleOnSelect}
              >
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="PHP">PHP</option>
                <option value="C#">C#</option>
                <option value="Ruby">Ruby</option>
                <option value="Java">Java</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn"
            >
              Join Chat
            </button>
          </form>
        </main>
      </div>
    </>
  );
};
