## Commands

Build the image:

```
docker image build --progress=plain -t dfvis ./docker
```

Start the server:

```
docker run --volume $(pwd)/server:/server --volume $(pwd)/lua-http:/lua-http --publish 3333:3333 --env PORT=3333 --name dfvis --interactive --tty --privileged dfvis
```

Kill the server with `ctrl`+c and then `docker rm dfvis` to remove the container.

Get a shell:
```
docker exec -it dfvis bash
```

Start Dwarf Fortress:
```
docker exec -it dfvis /df/df_linux/df
```

Start headless DFHack console:
```
docker exec -it --privileged --env DFHACK_HEADLESS=1 dfvis /df/df_linux/dfhack
```
(`die` to exit)

Erik's current command:
```
docker exec -it --privileged --env DFHACK_HEADLESS=1 dfvis /df/df_linux/dfhack +lua -f /server/daemon.lua
```

That doesn't work, but this does:
```
docker exec -it dfvis lua /server/daemon.lua
```

## Screenshots

![Screencast of running the steps above and having Dwarf Fortress start](media/container-dwarves.gif)