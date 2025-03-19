const WebSocket = require("ws");

class NotificationService {
    constructor() {
        this.clients = new Set();
    }

    init(server) {
        this.wss = new WebSocket.Server({ server });

        this.wss.on("connection", (ws) => {
            console.log("✅ WebSocket Client Connected");
            this.clients.add(ws);

            ws.on("message", (message) => {
                console.log("📩 Received from Client:", message);
            });

            ws.on("close", () => {
                console.log("❌ WebSocket Client Disconnected");
                this.clients.delete(ws);
            });

            ws.send(JSON.stringify({ message: "🔗 Connected to WebSocket Server!" }));
        });

        console.log("✅ WebSocket Server initialized!");
    }

    sendNotification(message) {
        this.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ message }));
            }
        });
    }
}

module.exports = new NotificationService();
