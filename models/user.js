const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    surname: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    }
}) 

module.exports = mongoose.model('User', userSchema);