## Commands

Build the image:

```
docker image build --progress=plain -t turbo ./df-turbo
```

Start the server:

```
run -v $(pwd)/server:/server -p 3333:3333 --name turbo turbo
```

Get a shell:
```
docker exec -it turbo bash
```