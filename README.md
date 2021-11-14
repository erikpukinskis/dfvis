## Overview

DFVis depends on two processes, which are designed to run in isolation:

* A DFHack daemon which runs inside a docker container. This process starts Dwarf Fortress with DFHack enabled, and then runs a Lua script that opens a TCP socket, accepts external commands, and runs them in DFHack.

* A Node web server which provides the UI and issues commands to the daemon.

## Getting started

1. The first step to getting that running is to **build the Docker image**:

```
docker image build --progress=plain -t dfvis ./docker
```

If you don't already have Docker, install [Docker Desktop](https://www.docker.com/products/docker-desktop).

2. Then **boot the container**:

```
docker run --volume $(pwd)/server:/server --volume $(pwd)/lua-lib:/df/df_linux/hack/lua/lib --publish 3333:3333 --env PORT=3333 --name dfvis --interactive --tty --privileged dfvis
```

You can stop the container with `ctrl`+c and then `docker rm dfvis` to remove the container.

3. You need to **start the web server** before firing up the DFHack daemon, because the daemon reaches out to the server (not vice versa):

```
node server
```

4. And lastly you can begin a Dwarf Fortress session and **run the daemon**:
```
docker exec -it --privileged --env DFHACK_HEADLESS=1 dfvis /df/df_linux/dfhack +lua -f /server/daemon.lua
```

At this point there should be a web site accessible at https://localhost:8080. Which can send any DFHack command as long as it has one (and exactly) argument:

![Screenshot of an editable JSON request in a web browser that specifies a command ("load-save") and some args (["region1"]) with a "Send" button](media/web-ui.gif)


## Other useful commands

Get a shell:
```
docker exec -it dfvis bash
```

Start Dwarf Fortress:
```
docker exec -it dfvis /df/df_linux/df
```

![Screencast of running the steps above and having Dwarf Fortress start](media/container-dwarves.gif)

