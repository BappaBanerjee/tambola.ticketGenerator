const express = require('express')
const errorHandler = require("./middleware/errorHandler")
const connectDB = require('./database/database.config')
const dotenv = require("dotenv").config()
const app = express()
const port = process.env.PORT
// var expressValidator = require('express-validator');
// app.use(expressValidator())

//importing routes
const userRoute = require('./routes/user.routes')
const ticketRoute = require('./routes/tambola.routes')

app.use(express.json());
app.get('/', (req, res) => res.send('This is a tambola ticket generator project, created by Bappa Banerjee.'))
app.use('/api/user', userRoute);
app.use('/api/ticket', ticketRoute);
app.use(errorHandler);


const start = async () => {
    try {
        await connectDB(process.env.DB_CONNECTION_LINK);
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))

    } catch (error) {
        console.log(error);
    }
}

start();