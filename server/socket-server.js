import net from "net";

let server = net.createServer();

server.on("connection", (socket) => {
  console.log("[server] I am connected!");
  socket.on("end", () => {
    console.log("[server] Socket ended!");
  });
  socket.on("data", (data) => {
    console.log("[server] Client said ", data.toString());
    socket.write("pong!");
    socket.end();
  });
  socket.write("hello?");
});

server.on("error", (err) => {
  throw err;
});

server.listen(1337, "localhost", 200, () => {
  console.log("opened server on", server.address());
});
