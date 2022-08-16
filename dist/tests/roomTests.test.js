"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const socket_io_client_1 = __importDefault(require("socket.io-client"));
describe("my awesome project", () => {
    let io, serverSocket, clientSocket;
    beforeAll((done) => {
        const httpServer = (0, http_1.createServer)();
        io = new socket_io_1.Server(httpServer);
        if (!httpServer)
            return;
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = new socket_io_client_1.default(`http://localhost:${port}`);
            io.on("connection", (socket) => {
                serverSocket = socket;
            });
            clientSocket.on("connect", done);
        });
    });
    afterAll(() => {
        io.close();
        clientSocket.close();
    });
    test("should work", (done) => {
        clientSocket.on("hello", (arg) => {
            expect(arg).toBe("world");
            done();
        });
        serverSocket.emit("hello", "world");
    });
});
