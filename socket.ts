import { useSocketServer } from 'socket-controllers';
import { Server } from 'socket.io'
import { MainController } from './controllers/mainController';

export default (httpServer: any) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
        },
        serveClient: true,
    });

    console.log(__dirname + "/controllers/*.js")
    useSocketServer(io, {
        controllers: [__dirname + "/controllers/*.js"]
    });

    return io;
}