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

// css color palette
const cssPalette = ['#5daf3b', //green
                    '#d8972d', //yellow
                    '#2d71d8', // blue
                    '#d82dcc']; // purple

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  const socketId = uuidv1();
  const textColor = cssPalette[getRandomInt(cssPalette.length)];

  wss.broadcast({connectedUsersCount: wss.clients.size});

  ws.on('message', (message) => {

    //tell everyone else that you're typing
    if (JSON.parse(message).isTyping) {
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({isTyping: socketId}));
        }
      });
      return;
    }

    if (JSON.parse(message).notTyping) {
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({notTyping: socketId}));
        }
      });
      return;
    }
  
    
    const {message: {type, content, username}} = JSON.parse(message);
    let returnType;
    if (type === 'postMessage') {
      returnType = 'incomingMessage';
    } 
    else if (type === 'postNotification') {
      returnType = 'incomingNotification';
    }

    const messageWithId = {
      id: uuidv1(),
      header: {
        socketId,
        textColor,
      }, 
      message: {
        type: returnType,
        content,
        username,
      }
    };

    wss.broadcast(messageWithId);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    ws.terminate();
    wss.broadcast({connectedUsersCount: wss.clients.size});
  });
});
