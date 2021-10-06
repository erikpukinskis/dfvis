import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 12345 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });

  ws.send("something");
});

console.log(`Started websocket server on ws://localhost:12345? Maybe?`);
