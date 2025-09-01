const axios = require('axios');
const Order = require('../models/Order');


exports.createOrder = async (req, res) => {
try {
const { userId, productId, qty } = req.body;


// ambil data product dari product-service
const productRes = await axios.get(`http://localhost:4002/products/${productId}`);
const product = productRes.data;


if (!product) return res.status(404).json({ error: 'Product not found' });
if (product.stock < qty) return res.status(400).json({ error: 'Insufficient stock' });


const total = product.price * qty;


const order = await Order.create({ userId, productId, qty, total, status: 'pending' });
res.status(201).json(order);
} catch (err) {
res.status(400).json({ error: err.message });
}
};


exports.getOrders = async (req, res) => {
const orders = await Order.find();
res.json(orders);
};