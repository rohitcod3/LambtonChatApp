import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home.jsx";
import { ChatRoom } from "./components/ChatRoom.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatroom" element={<ChatRoom />} />{" "}
        {/* Optional: Default ChatRoom */}
        <Route path="/chatroom/:courseId/:userName" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
