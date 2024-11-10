import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home.jsx";
import { ChatRoom } from "./components/ChatRoom.jsx";
import { Logo1 } from "./components/Logo1.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatroom" element={<ChatRoom />} />{" "}
        {/* Optional: Default ChatRoom */}
        <Route path="/chatroom/:courseId/:userName" element={<ChatRoom />} />
        <Route path="/logo" element={<Logo1 />} />
      </Routes>
    </Router>
  );
}

export default App;
