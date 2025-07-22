# ChatWeb

## Imagem Docker Hub
``` bash
docker pull abelgasque/chat-web
```

``` bash
docker run -d --env-file .env -p 80:80 abelgasque/chat-web
```

## Iniciando imagem docker local

``` bash
docker build -t chat-web .
```

``` bash
docker run -d -p 80:80 --name container-chat-web chat-web
```