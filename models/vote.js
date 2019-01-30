const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    code: {
        required: true,
        type: String,
    },
    type: {
        required: true,
        type: Boolean
    }
}) 

module.exports = mongoose.model('Vote', voteSchema);