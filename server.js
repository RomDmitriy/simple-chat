import { WebSocketServer } from 'ws';

const server = new WebSocketServer({
    port: 3000
});

server.on('connection', ws => {
    console.log('Connected!');

    ws.on('error', console.error);

    ws.on('message', rawMessage => {
        let data = JSON.parse(rawMessage.toString());
        server.clients.forEach(client => {
            if (client.readyState === ws.OPEN) {
                client.send(data.username + ': ' + data.message)
            }
        });
    });
});