const mongoose = require('mongoose');

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    user_id: {
        type: String,
    },
})

module.exports = mongoose.model('posts', postSchema)