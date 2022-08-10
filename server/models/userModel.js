const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    fullName: {
        type: String,
    },
    avatar: {
        type: String,
    },
    email: {
        type: email,
    },
})

module.exports = mongoose.model('users', userSchema)