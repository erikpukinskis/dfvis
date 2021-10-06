local websocket = require "http.websocket"
local ws = websocket.new_from_uri("ws://docker.for.mac.host.internal:12345")
assert(ws:connect())
assert(ws:send("koo-eee!"))
local data = assert(ws:receive())
print("received " .. data)
assert(ws:close())