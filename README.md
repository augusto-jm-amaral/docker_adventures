# Docker Adventures :whale:
Minhas aventuras em docker :)

Como dockerizar uma aplicação [Nodejs](https://nodejs.org/en/) + [MongoDB](https://www.mongodb.com/)!

## A Aplicação
Consiste em um [CRUD](https://pt.wikipedia.org/wiki/CRUD) de gatos. :cat:

A propriedades de um gato:

```json
{
  "name": "Xaninho",
  "color": "Black",
  "age": 5,
  "weight": 10.5
}
```

As rotas são:
- `GET /status` Retorna o status do servidor.
- `GET /cats` Retorna uma lista de gatos.
- `POST /cats` Adiciona um gato.
- `PUT /cats/_id` Atualiza um gato pelo _id.
- `DELETE /cats/_id` Remove um gato pelo _id.

Você pode usar o [Postman](https://www.getpostman.com/) para testar as rotas.

## Artigo

[Neste artigo eu explico como dockerizar sua aplicação.](https://medium.com/@augusto.jm.amaral1/dockerizando-sua-aplica%C3%A7%C3%A3o-e18969613f4b)

Espero ter ajudado ;)
