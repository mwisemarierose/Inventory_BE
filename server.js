const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require('path');

const errorHandler = require('./middleware/errorMiddleware');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const contactRoute = require('./routes/contactRoute');

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended:  false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Replace with your frontend origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allowed HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
    next();
});


//routes middleware
app.use('/api/users', userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);


//routes
app.get('/', (req, res) => {
    res.send('home page');
})
  
//error middleware
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('connected to mongodb');
    app.listen(process.env.PORT, () => {
        console.log('listening to port', process.env.PORT);
    });
})
.catch((error) => {
    console.log(error);
})