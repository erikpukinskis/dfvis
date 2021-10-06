## Commands

Build the image:

```
docker image build --progress=plain -t dfvis ./docker
```

Start the server:

```
docker run --volume $(pwd)/server:/server --publish 3333:3333 --env PORT=3333 --name dfvis --interactive --tty --privileged dfvis
```

Kill the server with `ctrl`+c and then `docker rm dfvis` to remove the container.

Get a shell:
```
docker exec -it dfvis bash
```

## Screenshots

![Screencast of running the steps above and having Dwarf Fortress start](media/container-dwarves.gif)