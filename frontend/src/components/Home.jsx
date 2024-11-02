import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [courseId, setCourseId] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (courseId && userName) {
      navigate(`/chatroom/${courseId}/${userName}`);
    } else {
      alert("Please enter both a course ID and username");
    }
  };

  return (
    <div className="home">
      <h1>Welcome to Lambton College Chat</h1>
      <input
        type="text"
        placeholder="Enter Course ID"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={handleJoin}>Join Chat</button>
    </div>
  );
}
