var library = require("module-library")(require)

library.using(
  ["net", "crypto", "web-site", "browser-bridge", "web-element", "single-use-socket", "basic-styles"],
  function (net, crypto, WebSite, BrowserBridge, element, SingleUseSocket, basicStyles) {
    /**
     * Socket Server
     */

    var socketServer = net.createServer()

    var socketsById = {}

    socketServer.on("connection", (socket) => {
      var id = uniqueSocketId()
      console.log("Fortress connected. Gave it id " + id)
      socketsById[id] = socket
      socket.on("end", () => {
        console.log(`Socket ${id} closed.`)
        delete socketsById[id]
      })
      socket.on("data", (data) => {
        handleData(id, data)
      })
    })

    function handleData(socketId, data) {
      console.log(`Got data [${data}] from socket ${socketId}`)
    }

    socketServer.on("error", (err) => {
      throw err
    })

    socketServer.listen(1337, "localhost", 200, () => {
      console.log("opened socket server on", socketServer.address())
    })

    function randomId() {
      return crypto
        .randomBytes(25)
        .toString("base64")
        .replace(/[\+\/=]/g, "")
        .slice(0, 32)
    }

    function uniqueSocketId() {
      do {
        var id = randomId()
        if (!socketsById[id]) return id
      } while (true)
    }

    /**
     * Web server
     */

    var site = new WebSite()

    SingleUseSocket.installOn(site)
    site.start(8080)

    var baseBridge = new BrowserBridge()
    basicStyles.addTo(baseBridge)

    var mirrors = baseBridge.defineSingleton(
      "mirrors",
      function() {
        return {}})

    var sendCommand = baseBridge.defineFunction([
      mirrors],
      function sendCommand(mirrors, send, socketId, event) {
        event.preventDefault()
        var text = mirrors[socketId].getValue()
        var json = JSON.parse(text)
        send({ socketId, ...json })
      })

    var Fortress = element.template(
      "div",
      function (socketId, sendCommand) {
        this.addChildren(
          element(
            "h1",
            socketId),
          element(
            "form",{
              "onsubmit": sendCommand.withArgs(baseBridge.event).evalable()},[
              element(
                "textarea.textarea",{
                "id": "textarea-"+socketId},
                "{\n\t\"command\": \"load-save\",\n\t\"args\": [\"region1\"]\n}"),
              element(
                "p",
                element(
                  "input",{
                  type: "submit",
                  value: "Send"}))]))
    })

    baseBridge.addToHead(
      element(
        "link",{
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.3/codemirror.min.css"}),
      element(
        "script",{
        src: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.3/codemirror.min.js"}))

    var loadCodeMirror = baseBridge.defineFunction(
      [mirrors],
      function(mirrors, socketId) {
        var textarea = document.getElementById(
          "textarea-"+socketId)
        var config = {
          mode:  "json"}
        var mirror = CodeMirror.fromTextArea(
          textarea,
          config)
        mirrors[socketId] = mirror
        mirror.display.wrapper.classList.add(
          "textarea")})

    var webSocketsBySocketId = {}

    site.addRoute("get", "/", function (request, response) {
      var socketIds = Object.keys(
        socketsById)

      var bridge = baseBridge.forResponse(
        response)

      var webSocket = new SingleUseSocket(
        site)

      webSocket.listen(
        function(message) {
          var data = JSON.parse(message)
          var socket = socketsById[data.socketId]
          socket.write(message+"\n")
          console.log(
            "wrote message to socket")})

      var send = sendCommand.withArgs(
        webSocket.defineSendOn(
          bridge))

      bridge.domReady(
        [socketIds, loadCodeMirror],
        function(socketIds,loadCodeMirror) {
          socketIds.forEach(
            function(socketId) {
              loadCodeMirror(
                socketId)})})

      bridge.send(
        socketIds.map(
          function(socketId) {
            console.log("socket", socketId)
            return Fortress(
              socketId,
              send.withArgs(
                socketId))}))
    })
  }
)
