const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    status: {
        required: true,
        type: Boolean,
    }
}) 

module.exports = mongoose.model('Vote', voteSchema);