const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const port = 5000;
app.set("view engine", "ejs");
app.get("/home", (req, res) => {
  res.render("home");
});

server.listen(port, () => {
  console.log(`Server Running at ${port}`);
});

io.on("connection", (socket) => {
  console.log("User Connected " + socket.id);

  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  });
});
