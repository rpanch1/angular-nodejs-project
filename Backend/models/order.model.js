const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: {type: {}, default: {}},
    cart: {type: [], default: []},
    total: {type: Number, default: 0},
    orderPlacedOn: {type: Date, default: Date.now},
    isDelivered: {type: String, default: 'false'}
})

module.exports = mongoose.model('Order', orderSchema);