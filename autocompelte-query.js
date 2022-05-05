const { MongoClient } = require("mongodb");

// connect to your Atlas cluster
const uri =
    "mongodb+srv://User:user12345@cluster0.fywre.mongodb.net/chunk?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useUnifiedTopology: true});

async function run() {
    try {
        await client.connect();

        // set namespace
        const database = client.db("chunk");
        const coll = database.collection("restaurant");

        // define pipeline
        const agg = [
            {$search: {search_restaurant_autocomplete: {query: "pizza", path: "name"}}},
            {$limit: 20 },
            {$project: { name : 1 }}
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
