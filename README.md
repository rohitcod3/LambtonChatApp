# Lambton Chat App 💬

## **Overview**
The **Lambton Chat App** is a real-time messaging platform designed specifically for students to collaborate and communicate within their course-specific chatrooms. Built using **MongoDB, Express.js, React, and Socket.IO**, this app allows users to seamlessly join chatrooms based on their course IDs, fostering interactive discussions and engagement.

## **Features**
- 📚 **Course-Specific Chatrooms** – Users can join chatrooms by entering their **Course ID**, ensuring relevant discussions.
- 🌎 **General Chatroom** – A common space for all students to connect beyond their specific courses.
- ⚡ **Real-Time Messaging** – Powered by **Socket.IO**, enabling instant communication.
- 🗄️ **Persistent Chat History** – Messages are stored in **MongoDB** for easy retrieval.
- 🎨 **User-Friendly Interface** – Built with **React.js**, providing a seamless experience.

## **Tech Stack**
- **Frontend:** React.js
- **Backend:** Express.js, Node.js
- **Database:** MongoDB
- **Real-Time Communication:** Socket.IO

## **Installation & Setup**
### **Prerequisites**
- Node.js installed
- MongoDB running (local or cloud)

### **Steps**
1. Clone this repository:
   ```sh
   git clone https://github.com/rohitcod3/LambtonChatApp.git
   cd LambtonChatApp
   ```

2. Install backend dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```env
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the backend:
   ```sh
   npm run server
   ```

5. Navigate to the frontend folder and install dependencies:
   ```sh
   cd client
   npm install
   ```

6. Start the frontend:
   ```sh
   npm start
   ```

## **How It Works**
- Users enter a **Course ID** to join a chatroom specific to their course.
- If a chatroom exists for that Course ID, they are connected to it instantly.
- If no chatroom exists, a new one is created dynamically.
- A **general chatroom** is available for all users to communicate across courses.
- Messages are stored in **MongoDB**, ensuring persistence and retrieval.
- **Socket.IO** enables real-time messaging, broadcasting messages instantly to users in the chatroom.

## **Future Improvements**
- 🔐 **User Authentication** – Implement sign-in and sign-up features.
- 📄 **File Sharing** – Allow users to share documents and images.
- 🎤 **Voice & Video Chat** – Enhance communication with real-time voice/video features.
- 🌎 **Multi-Language Support** – Make the platform more inclusive.

## **Contributions**
We welcome contributions! Feel free to fork this repo, create a new branch, and submit a PR. 🚀

## **License**
MIT License

---

Enjoy real-time chatting with the **Lambton Chat App**! 💬🚀
