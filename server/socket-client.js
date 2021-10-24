import net from "net";

const client = new net.Socket();
client.connect(1337, "127.0.0.1", function () {
  console.log("[client] I am connected!");
  client.write("ping!");
});

client.on("data", function (data) {
  console.log("[client] Server said " + data);
});

client.on("close", function () {
  console.log("[client] Connection was closed");
});
