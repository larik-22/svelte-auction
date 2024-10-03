import { WebSocketServer } from 'ws';
import axios from 'axios';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', async (message) => {
        console.log(`Received message => ${message}`);
        const { bid, token } = JSON.parse(message);

        try {
            const response = await axios.post('http://localhost:3000/api/bids', bid, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const newBid = response.data;

            // Broadcast the new bid to all clients
            wss.clients.forEach((client) => {
                if (client.readyState === ws.OPEN) {
                    client.send(JSON.stringify(newBid));
                }
            });
        } catch (error) {
            console.error('Error adding bid:', error.response ? error.response.data : error.message);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');