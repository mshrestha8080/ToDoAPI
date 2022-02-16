//Database schema

const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
    },
    roll: {
        type: String,
        required: [true, 'Roll field is required']
    },
    present: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('student', StudentSchema);