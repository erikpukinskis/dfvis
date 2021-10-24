local socket = require "plugins.luasocket"

local client = socket.tcp:connect('host.docker.internal',1337)
print('[client] I am connected!')

while true do
  data, errormsg = client:receive()

  if errormsg then
    print("Error message: " .. errormsg)
  elseif data then
    print("[client] Server said " .. data)
    if (data == "pong!") then
      break;
    end
    client:send('ping?')
  end
end