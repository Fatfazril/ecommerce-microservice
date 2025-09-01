const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
userId: { type: String, required: true },
productId: { type: String, required: true },
qty: { type: Number, required: true },
total: { type: Number, required: true },
status: { type: String, default: 'pending' }
});


module.exports = mongoose.model('Order', orderSchema);