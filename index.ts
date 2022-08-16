import "reflect-metadata";
import app from "./app";
import * as http from "http";
import socketServer from "./socket";

require('dotenv').config()

var port = process.env.PORT || "9000"
app.set("port", port);

var server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

const io = socketServer(server);

function onError(error:NodeJS.ErrnoException) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  if(!addr) throw "Address is NULL";
  console.log("Server Running on Port: ", port);
}