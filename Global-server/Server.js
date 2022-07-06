var app = require("express")();
var http = require("http").createServer(app);
const PORT = process.env.PORT || 5000;
var cors = require("cors");
app.use(cors());
var socket = require("socket.io");
var io = socket(http, { cors: { origin: "*" } });

//Sample routes
app.get("/", (req, res) => {
  res.send("Page works fine :)");
});

//socket.io integration
io.on("connection", (socket) => {
  socket.emit("socketID", socket.id);
  console.log(socket.id);
  socket.on("send message", (body) => {
    io.emit("message", body);
    console.log(body);
  });
  console.log("A new user connected!");
});

//listening the port
http.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
