## Commands

Build the image:

```
docker image build --progress=plain -t turbo ./df-turbo
```

Start the server:

```
docker run -v $(pwd)/server:/server -p 3333:3333 --env PORT=3333 --name turbo -i -t turbo
```

Get a shell:
```
docker exec -it turbo bash
```

Run Dwarf Fortress
```
docker exec -it turbo /df/df_linux/df
```