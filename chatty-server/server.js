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

  wss.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      client.send(JSON.stringify({connectedUsersCount: wss.clients.size}));
    }
  });


  ws.on('message', (message) => {

    const {message: {type, content, username}} = JSON.parse(message);
    let returnType;
    if (type === 'postMessage') {
      returnType = 'incomingMessage';
    } 
    else if (type === 'postNotification') {
      returnType = 'incomingNotification';
    }
    
    const messageWithId = {
       
      message: {
        id: uuidv1(),
        type: returnType,
        content: content,
        username: username,
      }

    };

    console.log(messageWithId)


    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(messageWithId));
      }
    });


  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log(`ClientID ${socketId} disconnected`);
    ws.terminate();
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify({connectedUsersCount: wss.clients.size}));
      }
    });
  });
});
