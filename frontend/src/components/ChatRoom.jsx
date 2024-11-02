import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function ChatRoom() {
  const { courseId, userName } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages when the component loads
  useEffect(() => {
    fetchMessages();
  }, [courseId]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/messages/${courseId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage) return;
    const messageData = {
      courseId,
      userName,
      message: newMessage,
    };

    try {
      await axios.post("/api/messages", messageData);
      setMessages((prev) => [...prev, messageData]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div className="chatroom">
      <h2>Course Chatroom: {courseId}</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.userName}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}
