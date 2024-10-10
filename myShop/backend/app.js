const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');


app.use(express.json())
app.use(cors());


const orderRouter = require('./routes/orderRouter')
const productRouter = require('./routes/productRouter')
const userRouter = require('./routes/userRouter');
const cartRouter = require('./routes/cartRouter');


app.use('/api/order', orderRouter)
app.use('/api/carts',cartRouter);
app.use('/api/users', userRouter);
app.use('/api',productRouter);
// app.use('/images',express.static(path.join(__dirname, 'uploads')))
module.exports = app;