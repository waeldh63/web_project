const mongoose = require('mongoose'); 

const URI = "mongodb+srv://User:user12345@cluster0.fywre.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async()=>{
   await mongoose.connect(URI);
   console.log('DB connected..');
};

module.exports = connectDB;

