const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetupSchema = new Schema({
    title: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    attendees: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}) 

module.exports = mongoose.model('Meetup', meetupSchema);