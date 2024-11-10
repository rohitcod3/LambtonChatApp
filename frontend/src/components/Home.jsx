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
    <div className="home flex flex-col justify-center items-center w-screen h-screen">
      <div className="flex flex-col rounded-lg background-color: #ff5733; w-[450px] h-[400px] bg-gray-700 items-center justify-center shadow-2xl">
        <h1>Welcome to Lambton College Chat</h1>
        <div className="flex flex-col">
          <input
            type="text"
            className="rounded-lg"
            placeholder="Enter Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          />
          <input
            type="text"
            className="rounded-lg"
            placeholder="Enter Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <button className="btn btn-neutral" onClick={handleJoin}>
          Join Chat
        </button>
      </div>
    </div>
  );
}
