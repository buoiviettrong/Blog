const mongoose = require('mongoose');

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    user_id: {
        type: String, // user id
    },
    post_id: {
        type: String, // post id
    },
    context: {
        type: String,
    },
    reply_id: {
        type: String, // comment id
        required: false
    },
})

module.exports = mongoose.model('comments', CommentSchema)