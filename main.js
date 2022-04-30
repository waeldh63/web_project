const { MongoClient, ObjectID } = require("mongodb");

const Express = require("express");

const Cors = require("cors");

const BodyParser = require("body-parser");

const { request } = require("express");



const client = new MongoClient("mongodb+srv://User:user12345@cluster0.fywre.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

const server = Express();



server.use(BodyParser.json());

server.use(BodyParser.urlencoded({ extended: true }));

server.use(Cors());



var collection;



server.get("/search", async (request, response) => {});

server.get("/get/:id", async (request, response) => {});



server.listen("3000", async () => {

    try {

        await client.connect();

        collection = client.db("chunk").collection("restaurant");

    } catch (e) {

        console.error(e);

    }

});