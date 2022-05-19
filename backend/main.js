const { MongoClient } = require("mongodb");
const Express = require ("express");
const Cors = require("cors");
const BodyParser = require("body-parser");
var express = require('express');
var router = express.Router();


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
      
  // Fetching the records 
        

  
  collection.find({ "cuisine": "Italian" }).toArray().then((ans) => {
            for(i=0;i<ans.length;i++){
                    console.log(ans[i].name);
                    console.log("test2");
                    //render ('italian.ejs', {"name":ans[i].name});
        }
    });

    collection.find({ "cuisine": "Mexican" }).toArray().then((ans) => {
        //console.log(ans);
    });

    collection.find({ "cuisine": "American" }).toArray().then((ans) => {
        //console.log(ans);
    });

    collection.find({ "cuisine": "Irish" }).toArray().then((ans) => {
        //console.log(ans);
    });

    collection.find({ "cuisine": "Lebanese" }).toArray().then((ans) => {
        //console.log(ans);
    });

    } catch (e) {
        console.error(e);
    }

});
