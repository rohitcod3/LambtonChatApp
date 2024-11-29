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
  //h-[85vh] changed to h-[100vh]
  return (
    <div className="chatroom h-screen flex justify-center items-center home-background overflow-hidden">
      <div className="h-[100vh] lg:h-[85vh] w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] bg-purple-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border  border-gray-100">
        <div className="flex flex-col justify-between items-center shadow-lg w-full h-full p-5 rounded-md ">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl mb-4 text-center">
            Course Chatroom: {courseId}
          </h2>
          <div
            className="messages custom-scrollbar h-[75vh] sm:h-[65vh] md:h-[70vh] w-full overflow-y-auto p-3 rounded-md mb-4"
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
          <div className="w-full flex items-center relative">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 w-full sm:px-4 py-2 my-10 pr-10 rounded-md border border-gray-500 focus:outline-none"
            />
            {/* Send Button for Desktop */}
            <button
              onClick={handleSendMessage}
              className="hidden sm:block px-3 py-2 bg-blue-500 text-white rounded-md ml-2"
            >
              Send
            </button>
            {/* Arrow Icon for Mobile */}
            <button
              onClick={handleSendMessage}
              className="absolute right-2 top-[49px] transform -translate-y-1/2 transform-translate-x-1 sm:hidden text-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-blue-500 rotate-45 rotate-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M22 2L11 13"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M22 2L15 22 11 13 2 9l20-7z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
