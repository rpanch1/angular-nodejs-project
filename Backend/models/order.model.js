const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: {type: {}, default: {}},
    cart: {type: [], default: []},
    orderPlacedOn: {type: Date, default: Date.now},
    isDelivered: {type: String, default: 'false'}
})

module.exports = mongoose.model('Order', orderSchema);