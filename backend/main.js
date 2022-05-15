const { MongoClient } = require("mongodb");
const Express = require ("express");
const Cors = require("cors");
const BodyParser = require("body-parser");

const client = new MongoClient("mongodb+srv://User:user12345@cluster0.fywre.mongodb.net/chunk?retryWrites=true&w=majority");
const server = Express();

server.use(BodyParser.json());
server.use(BodyParser.urlencoded({extended:true}));
server.use(Cors());

var collection;






server.get("/search", async (request, response) => {
    try {
        let result = await collection.aggregate([
            {
            "$search": {
                "autocomplete": {
                    "query": `${request.query.term}`,
                    "path": "name",
                    "fuzzy": {
                        "maxEdits": 2
                    }
                }
            }
        }
    ]).toArray();
    response.send(result);
    } catch(e) {
        response.status(500).send({ message: e.message });
    }
})

server.listen("3001", async () => {
    try {
        await client.connect();
       
        collection = client.db("chunk").collection("recipes");
        console.log('Server is started ');
      

    } catch (e) {
        console.error(e);
    }
});
