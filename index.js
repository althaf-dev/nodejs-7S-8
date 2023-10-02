const express = require("express");
var path = require('path');
var hbs = require('express-handlebars');
var session = require("express-session");
var db = require("./configuration/connection");
var fileUpload = require("express-fileupload");
var session = require("express-session");

// Create an Express app and listen for incoming requests on port 3000
const app = express();
// const router = express.Router();
var userRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
const port = process.env.PORT || 3000;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs.engine({extname:'.hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partilasDir:__dirname+'/view/partials/'}));
// Use middleware to parse incoming requests with JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"key",cookie:{maxAge:60000}}))
app.use(fileUpload());

db.connect((err)=>{
  
  if(err)  console.log(err);
  else console.log("connected successfully");
  
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Handle GET requests to the root URL
// router.get("/", (req, res) => {
//   console.log("hello");
//   console.log(__dirname);
//   res.render('user/view-product');
// });

// Handle POST requests to specific URLs i.e. webhook endpoints
// router.post("/webhook-1", (req, res) => {
//   console.log(req.body);
//   res.send("Webhook 1 successfully received.");
// });

// router.post("/webhook-2", (req, res) => {
//   console.log(req.body);
//   res.send("Webhook 2 successfully received.");
// });

// Mount the router middleware
// app.use(router);
app.use('/', userRouter);
app.use('/admin', adminRouter);


// Start the server and listen for incoming connections
app.listen(port, () => {
  console.log(`Server running at https://localhost:${port}/`);
});
