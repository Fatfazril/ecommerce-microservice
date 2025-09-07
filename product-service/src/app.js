const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');


const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/productDB')
.then(() => console.log('Connected to Product DB'))
.catch(err => console.error(err));

app.use('/' , (req, res) => {
    res.send('Product Service is running');
});

app.use('/products', productRoutes);


app.listen(4002, () => console.log('Product Service running on port 4002'));