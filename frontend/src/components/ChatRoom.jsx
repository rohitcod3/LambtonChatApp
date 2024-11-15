import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

export function ChatRoom() {
  const { courseId, userName } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchMessages();

    const newSocket = io("https://lambtonchatapp.onrender.com", {
      withCredentials: true,
    });
    setSocket(newSocket);

    newSocket.emit("joinChat", userName);

    newSocket.on("usernameError", (error) => {
      alert(error);
      navigate("/");
    });

    newSocket.on("joinedChat", (message) => {
      console.log(message);
    });

    newSocket.on("receiveMessage", (messageData) => {
      setMessages((prev) => [...prev, messageData]);
    });

    return () => newSocket.disconnect();
  }, [fetchMessages, navigate, userName]);

  // const handleSendMessage = async () => {
  //   if (!newMessage.trim()) return;

  //   const messageData = {
  //     courseId,
  //     userName,
  //     message: newMessage,
  //   };

  //   try {
  //     const response = await axios.post(
  //       "https://lambtonchatapp.onrender.com/api/messages",
  //       messageData,
  //       { withCredentials: true }
  //     );
  //     socket.emit("sendMessage", response.data);
  //     setNewMessage("");
  //   } catch (error) {
  //     console.error("Failed to send message", error);
  //   }
  // };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      courseId,
      userName,
      message: newMessage,
    };

    try {
      // Send the message to the server
      const response = await axios.post(
        "https://lambtonchatapp.onrender.com/api/messages",
        messageData,
        { withCredentials: true }
      );

      // Emit the message data excluding _id to the WebSocket server
      const { _id, ...data } = response.data; // Remove _id if present
      socket.emit("sendMessage", data);

      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div className="chatroom h-screen flex justify-center items-center home-background  ">
      <div className="h-[700px]w-[500px]  bg-purple-400 rounded-md  bg-clip-padding  backdrop-filter  backdrop-blur-lg bg-opacity-10  border border-gray-100">
        <div className="flex flex-col justify-between items-center shadow-lg bg-gsray-900 w-[535px] h-[700px] p-5 rounded-md  ">
          <h2 className="text-white text-xl mb-4">
            Course Chatroom: {courseId}
          </h2>
          <div className="messages custom-scrollbar h-[600px] w-full overflow-y-auto bg-gddray-800 p-3 rounded-md mb-4 ">
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
    </div>
  );
}
