"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_controllers_1 = require("socket-controllers");
const socket_io_1 = require("socket.io");
exports.default = (httpServer) => {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "*",
        },
        serveClient: true,
    });
    console.log(__dirname + "/controllers/*.js");
    (0, socket_controllers_1.useSocketServer)(io, {
        controllers: [__dirname + "/controllers/*.js"]
    });
    return io;
};
