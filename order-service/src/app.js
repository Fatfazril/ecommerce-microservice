const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');


const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/orderDB')
.then(() => console.log('Connected to Order DB'))
.catch(err => console.error(err));


app.use('/orders', orderRoutes);


app.listen(4003, () => console.log('Order Service running on port 4003'));