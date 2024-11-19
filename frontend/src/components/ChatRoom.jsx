import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

export function ChatRoom() {
  const { courseId, userName } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const navigate = useNavigate();

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch messages for the current chatroom
  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://lambtonchatapp.onrender.com/api/messages/${courseId}`,
        { withCredentials: true }
      );
      setMessages(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  }, [courseId]);

  // Initialize socket connection and event listeners
  useEffect(() => {
    fetchMessages();

    socketRef.current = io("https://lambtonchatapp.onrender.com", {
      withCredentials: true,
    });

    // Join chatroom
    socketRef.current.emit("joinChat", userName);

    // Handle username error
    socketRef.current.on("usernameError", (error) => {
      alert(error);
      navigate("/");
    });

    // Welcome message for joining chat
    socketRef.current.on("joinedChat", (message) => {
      console.log(message);
    });

    // Receive new messages
    socketRef.current.on("receiveMessage", (messageData) => {
      setMessages((prev) => [...prev, messageData]);
    });

    // Cleanup on component unmount
    return () => {
      socketRef.current.disconnect();
      socketRef.current = null;
    };
  }, [fetchMessages, userName, navigate]);

  // Scroll to the bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      courseId,
      userName,
      message: newMessage,
    };

    try {
      // Send the message to the server
      await axios.post(
        "https://lambtonchatapp.onrender.com/api/messages",
        messageData,
        {
          withCredentials: true,
        }
      );

      // Clear the input field and scroll to the bottom
      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  // Handle "Enter" key press to send a message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chatroom h-screen flex justify-center items-center home-background">
      <div className="h-[85vh] w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] bg-purple-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100">
        <div className="flex flex-col justify-between items-center shadow-lg w-full h-full p-5 rounded-md">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl mb-4 text-center">
            Course Chatroom: {courseId}
          </h2>
          <div
            className="messages custom-scrollbar h-[60vh] sm:h-[65vh] md:h-[70vh] w-full overflow-y-auto p-3 rounded-md mb-4"
            style={{ paddingBottom: "2rem" }}
          >
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
                        ? "background-gradient"
                        : "background-gradient"
                    } p-2 rounded-md mb-2`}
                  >
                    <strong
                      className={
                        msg.userName === userName
                          ? "text-slate-300 font-bold"
                          : ""
                      }
                    >
                      {msg.userName === userName ? "You" : msg.userName}
                    </strong>
                    : {msg.message}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef}></div>
          </div>
          <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 w-full sm:px-4 py-2 rounded-md border border-gray-500 focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="px-3 w-full max-w-[100px] py-2 bg-blue-500 text-white rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
