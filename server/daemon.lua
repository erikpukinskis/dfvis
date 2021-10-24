local socket = require "plugins.luasocket"

local server = socket.tcp:connect('host.docker.internal',1337)
print('socket is connected')
print('recv' .. server:receive())
server:send('ping?')
print('recv' .. server:receive())
