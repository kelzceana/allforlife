const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 8010;
const db = require("./db/dbIndex");
//const cookieSession = require('cookie-session');


const bodyParser = require('body-parser');

// routes constants
const users = require("./routes/users");
const jobPost = require("./routes/jobPost");
const providers = require("./routes/providers");

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

// app.use(cookieSession({
//   name: 'session',
//   keys: ['key1', 'key2'],
//   maxAge: 24 * 60 * 60 * 1000, // 24 hours
//   secure:false
// }));

app.use(cookieParser());

//routes
app.use("/api", users(db));
app.use("/api/jobpost", jobPost(db));
app.use("/api/providers",providers(db));


//app listening
app.listen(PORT, ()=>{
  console.log(`app is listening at port ${PORT}`);
});