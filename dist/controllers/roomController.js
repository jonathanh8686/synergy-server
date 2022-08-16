"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const socket_io_1 = require("socket.io");
const { SocketController, OnMessage, SocketIO, ConnectedSocket, MessageBody } = require("socket-controllers");
let RoomController = class RoomController {
    joinRoom(io, socket, message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Join Room Event: " + JSON.stringify(message));
            if (!('roomID' in message)) {
                socket.emit("join_room_response", {
                    result: "failed",
                    reason: `Invalid message, does not contain roomId`
                });
                return;
            }
            const connectedSockets = io.sockets.adapter.rooms.get(message["roomID"]);
            const socketRooms = Array.from(socket.rooms.values()).filter((r) => r !== socket.id);
            if (socketRooms.length > 0) {
                socket.emit("join_room_response", {
                    result: "failed",
                    reason: `Socket ${socket.id} is already in a room`
                });
                return;
            }
            if (connectedSockets && connectedSockets.size > 1) {
                socket.emit("join_room_response", {
                    result: "failed",
                    reason: "This room is already full"
                });
                return;
            }
            yield socket.join(message["roomID"]);
            socket.emit("join_room_response", {
                result: "success"
            });
        });
    }
};
__decorate([
    OnMessage("join_room"),
    __param(0, SocketIO()),
    __param(1, ConnectedSocket()),
    __param(2, MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Server, socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "joinRoom", null);
RoomController = __decorate([
    SocketController()
], RoomController);
exports.RoomController = RoomController;
