var library = require("module-library")(require);

library.using(
  ["net", "crypto", "web-site", "browser-bridge", "web-element"],
  function (net, crypto, WebSite, BrowserBridge, element) {
    /**
     * Socket Server
     */

    const socketServer = net.createServer();

    const socketsById = {};

    socketServer.on("connection", (socket) => {
      const id = uniqueSocketId();
      console.log("Fortress connected. Gave it id " + id);
      socketsById[id] = socket;
      socket.on("end", () => {
        console.log(`Socket ${id} closed.`);
        delete socketsById[id];
      });
      socket.on("data", (data) => {
        handleData(id, data);
      });
    });

    function handleData(socketId, data) {
      console.log(`Got data [${data}] from socket ${socketId}`);
    }

    socketServer.on("error", (err) => {
      throw err;
    });

    socketServer.listen(1337, "localhost", 200, () => {
      console.log("opened socket server on", socketServer.address());
    });

    function randomId() {
      return crypto
        .randomBytes(25)
        .toString("base64")
        .replace(/[\+\/=]/g, "")
        .slice(0, 32);
    }

    function uniqueSocketId() {
      do {
        const id = randomId();
        if (!socketsById[id]) return id;
      } while (true);
    }

    /**
     * Web server
     */

    var Fortress = element.template("div", function (socketId) {
      this.addChildren(element("h1", socketId));
    });

    var site = new WebSite();

    site.start(8080);

    var bridge = new BrowserBridge();


    site.addRoute("get", "/", function (request, response) {
      var socketIds = Object.keys(socketsById);
      bridge.forResponse(response).send(socketIds.map(Fortress));
    });
  }
);
