// server.js

const express = require('express');
const WebSocket = require('ws')

const SocketServer = WebSocket.Server;

const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log("people connected", wss.clients.size)
  const socketId = uuidv1();
  console.log(`Client connected: ${socketId}`);
  ws.on('message', (message) => {

    const {message: {type, content, username}} = JSON.parse(message);

    // console.log(jsonMessage.message.content)
    const messageWithId = {
      message: {
        id: uuidv1(),
        type: type,
        content: content,
        username: username,
      }
    };


    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(messageWithId));
      }
    });


  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    
    console.log(`ClientID ${socketId} disconnected`);
    ws.terminate();
  });
});
