const express = require('express')
// const dotenv = require('dotenv')
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const SERVER_PORT = process.env.PORT || 8081
const app = express();
const userRoutes = require('./routes/user')
const offerRoutes = require('./routes/offer')

mongoose.connect('mongobd://locolhost:27017/')
.then(()=> {
    console.log("Connected to DB..")
}).catch(()=> {
    console.log(" Failed to Connect to DB..")
});

app.use(bodyparser.json());

app.listen(SERVER_PORT, ()=> {
    console.log(" Server is running on the PORT " + " " + SERVER_PORT)
});

app.use("/user", userRoutes)
app.use("/offer", offerRoutes);