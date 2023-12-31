//Importing Libraries
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

//Importing the connectToDB function to the index.js file as it is the main entry to the project + calling the function or running the function
const connectToDB = require("./config/db");
connectToDB();

//Adding Node features
// Middleware pour parser les données JSON dans les requêtes
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const origin = process.env.VITE_ORIGIN;

app.use(
  cors({
    origin, // Update with your React app's URL
    credentials: true, // Enable credentials (cookies)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

//Initalizing the express app
require("./routes/movies")(
  app.use(
    cors({
      origin, // Update with your React app's URL
      credentials: true, // Enable credentials (cookies)
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      allowedHeaders: "Content-Type, Authorization",
    })
  )
);

// Middleware pour parser les cookies
app.use(cookieParser());

//Importing the auth routes module
const auth = require("./routes/authRoutes");

//using the auth route
app.use("/api/auth", auth);

// Importing the verifyToken middleware
const verifyToken = require("./middlewares/authMiddleware");

// Applying the verifyToken middleware
app.use("/api/auth/profile", verifyToken);

const options = {
  key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "localhost.pem")),
};

const server = http.createServer(options, app);

// Importing the development support form utils/development.js
const { printConsole } = require("./utils/development");

/*
  ===============================================================
 Importing the port set on the .env, if the port number is not set on .env or the port is being used by another server
running on the local macchine we are asking the app to use 3000 as the port number 
  ===============================================================
*/
const PORT = process.env.PORT || 8000;

//Listing to the app and running it on PORT 8000
server.listen(PORT, async () => {
  printConsole(
    { data: `Server is live @${PORT}` },
    { printLocation: "index.js:28" },
    {
      bgColor: "bgGreen",
      textColor: "black",
      underline: true,
    }
  );
});
