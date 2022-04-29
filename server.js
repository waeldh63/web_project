const express = require('express');

const Cors = require("cors");
const BodyParser = require("body-parser");

const connectDB = require('./food-delivery/DB/Connection');
const app = express();

connectDB();
const Port = process.env.Port || 3000;

app.listen(Port,()=>console.log('Server Started'));

// test
app.get("/search_restaurant", async (req, res) => {
    try {
        let results = await Collection.aggregate([

{"$search":{

"autocomplete":{

"query":` ${req.query.term} `,

"path":"name",

"fuzzy":{

    "maxEdits":2

}
}
}

}

        ]).toArray();

        res.send(results);

       

      res.send([]);

    } catch (error) {

      res.status(500).send({message: error.message})

   

    }

  });

app.listen(Port,()=>console.log('Server Started'));

