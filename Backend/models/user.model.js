const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, default: ''},
    address: {type: String, default: ''},
    image: {type: String, default: ''},
    interests: {type: String, default: ''},
    role: {type: String, default: 'normal'}
})

module.exports = mongoose.model('User', userSchema);