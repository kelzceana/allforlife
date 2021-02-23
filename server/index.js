const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cookieParser = require('cookie-parser');
const PORT = 8010;


const app = express();
const server = http.createServer(app);

const db = require("./db/dbIndex");
const bodyParser = require('body-parser');

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3002",
    methods: ["GET", "POST"]
  }
});
let people = {};

// socket.io
io.on('connection', (socket) => {
  console.log("a user has connected");
  socket.on('join', (name) => {
    people[name] = socket.id;
  });
  
  //get socket ID of every connection
  socket.emit("getID", socket.id);

  //send notification
  socket.on('notification', (response) => {
    console.log(response);
    io.emit("sendnotification", 1);
  });

  socket.on("send message", body =>{
    socket.emit("message", body);
    console.log(body, 'body')
    io.to(people[body.receiverID]).emit("message", body);
  });

  socket.on("disconnect", () => {
    console.log("user has left the chat");
  });
});

 
// routes constants
const users = require("./routes/users");
const jobPost = require("./routes/jobPost");
const providers = require("./routes/providers");
const jobproposal = require("./routes/jobProposals");
const messages = require("./routes/messages");


//initializing middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', '*');
  next();
});


app.use(cookieParser());

//routes
app.use("/api", users(db));
app.use("/api/jobpost", jobPost(db));
app.use("/api/providers",providers(db));
app.use("/api/jobproposals", jobproposal(db));
app.use("/api/messages", messages(db));


//app listening
server.listen(PORT, ()=>{
  console.log(`app is listening at port ${PORT}`);
});