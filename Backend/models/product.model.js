const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    discountPrice: {type: Number, default: 0},
    description: {type: String, default: ''},
    image: {type: String, default: ''},
    createdOn: {type: Date, default: Date.now},
    isTopProduct: {type: String, default: 'false'}
})

module.exports = mongoose.model('Product', productSchema);