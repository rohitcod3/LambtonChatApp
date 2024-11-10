import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

export function ChatRoom() {
  const { courseId, userName } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/messages/${courseId}`,
        { withCredentials: true }
      );
      setMessages(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  }, [courseId]);

  useEffect(() => {
    fetchMessages();

    const newSocket = io("http://localhost:8000", { withCredentials: true });
    setSocket(newSocket);

    newSocket.on("receiveMessage", (messageData) => {
      setMessages((prev) => [...prev, messageData]);
    });

    return () => newSocket.disconnect();
  }, [fetchMessages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      courseId,
      userName,
      message: newMessage,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/messages",
        messageData,
        { withCredentials: true }
      );
      socket.emit("sendMessage", response.data);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div className="chatroom h-screen flex justify-center items-center">
      <div className="flex flex-col justify-between items-center shadow-lg bg-gray-900 w-[500px] h-[600px] p-5 rounded-md">
        <h2 className="text-white text-xl mb-4">Course Chatroom: {courseId}</h2>
        <div className="messages h-[400px] w-full overflow-y-auto bg-gray-800 p-3 rounded-md mb-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${
                  msg.userName === userName ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble ${
                    msg.userName === userName
                      ? "chat-bubble-primary"
                      : "chat-bubble-secondary"
                  } p-2 rounded-md mb-2`}
                >
                  <strong>
                    {msg.userName === userName ? "You" : msg.userName}
                  </strong>
                  : {msg.message}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="w-full flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-4 py-2 mr-2 rounded-md border border-gray-500 focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
