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

## Vamos ao que interessa, Docker!!! :whale:

A primeira pergunta/resposta, **Porque usar Docker?**

Eu me perguntava isso até começar a utilizar, imagina você desenvolver uma aplicação que depende de diversas outras tecnologias, vários bancos de dados, inúmeras dependência, até parece fácil, só instalar tudo na nossa maquina e beleza, agora quando você faz parte de uma equipe isso não é tão simples, todos teriam de configurar o ambiente, e essa configuração poderia ser extensa, e se algo mudar? Todos teriam de fazer a mesmas alterações, trabalhoso não? O docker resolve esse nosso problema, com ele podemos configurar ambientes que vão ser executados de forma isolada, sem poluir sua maquina, isso quer dizer que não preciso instalar nenhum db, nem mesmo o nodejs, e tudo vai funcionar através de alguns scripts.

Tudo que precisamos é do Docker instalado e vamos utilizar também o Docker Compose.

> Instalação do Docker
- [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
- [Debian](https://docs.docker.com/install/linux/docker-ce/debian/)
- [Windows](https://docs.docker.com/docker-for-windows/install/)
- [Mac](https://docs.docker.com/docker-for-mac/install/)

O Docker Compose serve para administrar um conjunto de contêiner docker, dessa forma podemos ter um contêiner responsável por subir nossa aplicação em node e outro responsável por subir nossa banco de dados como vamos ver logo mais.

> Instalação do Docker Compose
- [Todos os OSs](https://docs.docker.com/compose/install/#install-compose)

Agora vamos aprender como tudo isso funciona.

## Configurando os nosso contêiners :whale:

Tudo começa com o arquivo [`Dockerfile`](./Dockerfile), criamos ele na raiz do nosso projeto, o Dockerfile vai conter o script de execução para  nossa aplicação em node. É Ele quem vai configurar internamente o nosso contêiner node.

O nosso `Dockerfile` fica assim:
```docker
FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
EXPOSE 3000

CMD [ "npm", "start" ]
```

Calma, vou explicar cada linha acima:

- `FROM`: Aqui dizemos qual imagem queremos utilizar no nosso contêiner, essa imagens estão armazenadas no [Docker Hub](https://hub.docker.com/), la você pode encontrar a imagem perfeita para o que deseja construir.

- `RUN`: Para executar um comando, seja para criar uma pasta ou instalar as dependências pro projeto.

- `WORDIR`: Define o diretório como o `root` para os comandos `COPY`, `RUN` e `CMD`.

- `COPY`: Serve para copiar os nossos arquivos.

- `EXPOSE`: Através dele definimos quais portas queremos expor no nosso contêiner, pode ser uma 3000 no caso para nossa aplicação node.

- `CMD`: Aqui definimos qual comando sera executado para subir nossa aplicação.

Aqui temos nosso contêiner `nodejs` prontinho, mais calma, ainda falta o nosso banco de dados.

Para este exemplo vamos utilizar o `MongoDB`, uma banco de dados que contem todos os atributos [ACID](https://pt.wikipedia.org/wiki/ACID) e combina muito ao meu ver com nodejs.

Vamos utilizar outro contêiner docker para subir o nosso `Mongo` para isso vamos precisar do docker compose, podemos começar criando o arquivo [`docker-compose.yml`](./docker-compose.yml) na raiz de nossa aplicação.

Nele vamos inserir o seguinte script:

```yml
version: "2"
services:
  app:
    container_name: "app"
    restart: always
    build: .
    environment:
      - MONGO_URI=mongodb://mongo/catstore
    ports:
      - "3000:3000"
    links:
      - mongo
    depends_on:
      - mongo
  mongo:
    container_name: "mongo"
    image: mongo
    ports:
      - "27017:27017"
    command: mongod --smallfiles --logpath=/dev/null # --quiet
```

Sobre os comandos:

- `version`: Definimos a versão do `docker-compose`.
- `services`: Vamos listar todos os nossos containers docker, para este caso temos dois, o *mongo* e o *app*.
- `container_name`: Aqui damos um nome ao nosso contêiner.
- `restart`: Definimos que o nosso contêiner sempre deve reiniciar de forma que nossas alterações sejam refletidas nele.
- `build`: Aqui passamos o caminho para o nosso `Dockerfile`, no caso da nossa aplicação node, o `Dockerfile` sera executado para o baixar as dependência de nossa aplicação `nodejs`.
- `environment`: Você pode definir a partir daqui as variáveis de ambiente do container.
- `ports`: Define quais portas a aplicação serão acessível, a primeira é a porta do contêiner e após os *:* a porta do host, no caso sua maquina.
`3000:3000` Significa que a porta 3000 do contêiner estará acessível na sua porta 3000.
- `links`: Passamos a quais contêineres o nosso contêiner vai se conectar, no casso nosso `app` vai se conectar ao `mongo`.
- `depends_on`: Aqui dizemos de quais serviços nossa aplicação depende, desta forma quando subirmos o contêiner `app`, o nosso contêiner `mongo` sera iniciado primeiro.
- `image`: No *Docker Compose* podemos definir qual imagem vamos utilizar em determinado serviço, para o serviço *mongo* vamos utilizar a imagem `mongo`.
- `command`: Podemos definir qual o comando de inicialização do contêiner também.

Não são todos os container que precisam de um `Dockerfile`, para o nosso banco precisamos apenas da imagem.

## Subindo os nossos container :whale::

Para subir nossa aplicação primeiro precisamos preparar os contêiner através do comando `docker-compose build`, dessa forma vamos montá-los, tudo sera executado exceto o `CMD` do `Dockerfile` e o `command` do `docker-compose.yml` estes serão executamos apenas quando subirmos os container, para subir a nossa aplicação basta executar o comando `docker-compose up app` assim vamos subir serviço *app*, e *voilá* temos nossa aplicação dockerizada!

Pretendo ir incrementando a aplicação/documentação.

Caso algo não fique claro basta entrar em contato, correções são bem vindas também.

Espero ter ajudado ;)
