const http = require("http");
const websocket = require("ws");
const port = 8000;

const server = http.createServer((req, res) => {
  res.end("Hi I am From Server");
});

// Establishment of Socket

const webserver = new websocket.Server({ server });
// console.log(webserver);

webserver.on("headers", (headers, req) => {
  console.log(headers);
});

/*
[
  'HTTP/1.1 101 Switching Protocols',
  'Upgrade: websocket', 
  'Connection: Upgrade',
  'Sec-WebSocket-Accept: s9G0vO9gN2GwA4YqHbgCJWfQPNI='
]
*/

webserver.on("connection", (ws, req) => {
  // Sending message to client
  ws.send("Hello");
});

server.listen(port, (req, res) => {
  console.log(`SERVER RUNNING AT ${port}`);
});
