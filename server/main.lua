-- Import turbo,
local turbo = require("turbo")

-- Create a new requesthandler with a method get() for HTTP GET.
local HelloWorldHandler = class("HelloWorldHandler", turbo.web.RequestHandler)
function HelloWorldHandler:get()
    self:write("Hello World Son!")
end

-- Create an Application object and bind our HelloWorldHandler to the route '/hello'.
local app = turbo.web.Application:new({
    {"/hello", HelloWorldHandler}
})

-- Set the server to listen on port 3333 and start the ioloop.

local PORT = tonumber(os.getenv('PORT'))

print("Starting at http://localhost:" .. PORT)

app:listen(PORT)
turbo.ioloop.instance():start()
