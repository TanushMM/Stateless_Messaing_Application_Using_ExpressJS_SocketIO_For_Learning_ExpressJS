# Messaging Application using ExpressJS and Socket.IO

This project is a real-time messaging application built with **ExpressJS** and **Socket.IO**. It allows users to send and receive messages in real time using WebSockets.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Code Explanation](#code-explanation)
- [Conclusion](#conclusion)

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for building APIs.
- **Socket.IO**: Library for real-time web applications, enabling real-time bidirectional event-based communication.
- **Bootstrap**: CSS framework for styling the front-end.

## Features

- **Real-Time Messaging**: Users can send messages, which will be immediately broadcasted to all connected clients.
- **User Interface**: Simple and responsive UI built using Bootstrap.
- **Message History**: Users can see previously sent messages.

## Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the server**:

   ```bash
   node server.js
   ```

4. **Open the application**:

   - Open your web browser and navigate to `http://localhost:5000`.

5. **Use the application**:
   - Enter your name and message in the input fields and click "Submit" to send a message.

## Code Explanation

### Server Code (server.js)

- **Dependencies**:

  ```javascript
  const express = require("express")
  const cors = require("cors")
  const app = express()
  const http = require("http").Server(app)
  const io = require("socket.io")(http)
  ```

  - **Express**: Used to create the server and handle routing.
  - **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
  - **HTTP Server**: The server instance created using `http.Server(app)` is necessary to allow Socket.IO to work.

- **Middleware**:

  ```javascript
  app.use(cors())
  app.use(express.static(__dirname))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  ```

  - **CORS Middleware**: Allows requests from different origins.
  - **Static Middleware**: Serves static files from the current directory.
  - **JSON and URL-encoded Middleware**: Parses incoming request bodies.

- **Message Handling**:

  ```javascript
  var messages = [
    { name: "User 1", message: "hello from User 1" },
    { name: "User 2", message: "hello from User 2" },
  ]

  app.get("/message", (req, res) => {
    res.json(messages).status(200)
  })

  app.post("/message", (req, res) => {
    messages.push(req.body)
    io.emit("message", req.body)
    res.sendStatus(200)
  })
  ```

  - **GET /message**: Responds with the current list of messages.
  - **POST /message**: Accepts new messages, adds them to the list, and emits the message to all connected clients using `Socket.IO`.

- **Socket.IO Connection**:

  ```javascript
  io.on("connection", () => {
    console.log("New user is connected")
  })
  ```

  - This event listener logs when a new user connects to the server.

### Client Code (index.html)

- The client-side code handles user input and displays messages.
- **Socket.IO Initialization**:

  ```javascript
  const socket = io()
  ```

  - Initializes the Socket.IO client, enabling real-time communication.

- **Message Submission**:

  ```javascript
  function submitMessage() {
    const name = document.getElementById("nameInput").value
    const message = document.getElementById("messageInput").value

    const data = { name: name, message: message }
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }

    fetch("http://127.0.0.1:5000/message", config)
  }
  ```

  - Collects user input and sends it to the server.

- **Real-time Message Reception**:

  ```javascript
  socket.on("message", (data) => {
    appendMessage(data)
  })
  ```

  - Listens for incoming messages and appends them to the message display.

## Conclusion

This messaging application showcases real-time communication capabilities using **Socket.IO** alongside **ExpressJS**. This project was developed while studying Node.js and Express.js from **"Learning NodeJS" by Alex Zanfir on LinkedIn Learning**. It serves as a great introduction to building modern web applications with real-time functionality.

Feel free to contribute to this project or use it as a reference for your own applications!
