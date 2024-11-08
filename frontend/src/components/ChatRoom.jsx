import React, { useEffect, useState, useCallback } from "react"; // Import useCallback
import { useParams } from "react-router-dom";
import axios from "axios";

export function ChatRoom() {
  const { courseId, userName } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/messages/${courseId}`
      );
      setMessages(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  }, [courseId]); // Include courseId as a dependency

  // Fetch messages when the component loads
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]); // Add fetchMessages to the dependency array

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return; // Ensure message is not empty
    const messageData = {
      courseId,
      userName,
      message: newMessage,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/messages",
        messageData
      ); // Updated URL here
      setMessages((prev) => [...prev, response.data]); // Use response to include `_id`
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div className="chatroom">
      <h2>Course Chatroom: {courseId}</h2>
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg._id} className="message">
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
