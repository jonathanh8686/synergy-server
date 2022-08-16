import { Socket, Server } from "socket.io";

const { SocketController, OnMessage, SocketIO, ConnectedSocket, MessageBody } = require("socket-controllers");

@SocketController()
export class RoomController {
    @OnMessage("join_room")
    public async joinRoom(@SocketIO() io : Server, @ConnectedSocket() socket : Socket, @MessageBody() message: any) {
        console.log("Join Room Event: " + JSON.stringify(message));

        if(!('roomID' in message)) {
            socket.emit("join_room_response", {
                result: "failed",
                reason: `Invalid message, does not contain roomId`
            })
            return;
        }

        const connectedSockets = io.sockets.adapter.rooms.get(message["roomID"]);
        const socketRooms = Array.from(socket.rooms.values()).filter((r) => r !== socket.id);

        if(socketRooms.length > 0) {
            socket.emit("join_room_response", {
                result: "failed",
                reason: `Socket ${socket.id} is already in a room`
            })
            return;
        }

        if(connectedSockets && connectedSockets.size > 1) {
            socket.emit("join_room_response", {
                result: "failed",
                reason: "This room is already full"
            })
            return;
        }

        await socket.join(message["roomID"]);
        socket.emit("join_room_response", {
            result: "success"
        });
    }

} 