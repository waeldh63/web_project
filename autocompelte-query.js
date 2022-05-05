const { MongoClient } = require("mongodb");

// connect to your Atlas cluster
const uri =
    "mongodb+srv://User:user12345@cluster0.fywre.mongodb.net/chunk?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        // set namespace
        const database = client.db("chunk");
        const coll = database.collection("restaurant");

        // define pipeline
        const agg = [
            {$search: {autocomplete: {query: "piz", path: "name"}}},
            {$limit: 20},
            {$project: {_id: 0,name: 1}}
        ];
        // run pipeline
        const result = await coll.aggregate(agg);

        // print results
        await result.forEach((doc) => console.log(doc));
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
