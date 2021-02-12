const express = require('express');
const app = express();
const PORT = 8010;
const db = require("./db/dbIndex");
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

// routes constants
const users = require("./routes/users");
const jobPost = require("./routes/jobPost");


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

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
<<<<<<< HEAD
}));


//routes
app.use("/api", users(db));
app.use("/api/jobpost", jobPost(db));
=======
}))

//routes
app.use("/api", users(db));
>>>>>>> 9c718e73a37e0c31af401e6fcd16c41f434d300d



//app listening
app.listen(PORT, ()=>{
  console.log(`app is listening at port ${PORT}`);
});