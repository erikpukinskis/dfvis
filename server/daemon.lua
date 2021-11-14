socket = require "plugins.luasocket"
json = require "lib.json"
dumper = require "dumper"

client = socket.tcp:connect('host.docker.internal',1337)
print('[client] I am connected!')

while true do
  message, errormsg = client:receive()
  if errormsg then
    print("Error message: " .. errormsg)
  elseif message then
    print("[client] Server said " .. message)
    if (message == "pong!") then
      break;
    end

    data = json.parse(message)
    print("folder: " .. dumper.DataDumper(data["args"][1]))
    dfhack.run_command(data.command, data.args[1])
    -- client:send('ping?')
  end
end


-- Get the fortress name:
-- dfhack.run_command("loadSave", "region1")
-- screen:sendInputToParent("z")



-- dfhack.gui.getCurViewscreen([skip_dismissed])

-- dfhack.maps.getTileSize()
-- dfhack.maps.getTileType(coords)

